
import numpy as np
import random
import pandas as pd
import math

def shipping_times_generator(rate, start_date, end_date):
    # num_weeks = 2
    # generate Poisson distribution for each week
    date_range = pd.date_range(start=start_date, end=end_date)
    num_day = len(date_range)
    num_week = num_day // 7
    ship_list = np.random.poisson(lam=rate, size=num_week)
    num_week_ship = ship_list[0]
    # create a numpy array with two columns: day index and request (yes or no)
    new_ship_data = np.zeros((7, 2))
    # choose random days in week to assign shipping
    if num_week_ship != 0:
        indices = np.random.choice(np.arange(0, 7), size=num_week_ship, replace=False)
        new_ship_data[indices, 1] = 1
        table = new_ship_data
    else:
        table = new_ship_data

    for i in range(1, num_week):
        num_week_ship = ship_list[i]
        # create a numpy array with two columns: day index and request (yes or no)
        new_ship_data = np.zeros((7, 2))
        # choose random days in week to assign shipping
        if num_week_ship != 0:
            indices = np.random.choice(np.arange(0, 7), size=num_week_ship, replace=False)
            new_ship_data[indices, 1] = 1
            table = np.vstack((table, new_ship_data))
        else:
            table = np.vstack((table, new_ship_data))


    table = np.vstack((table, np.zeros((num_day % 7, 2))))
    table = pd.DataFrame(table)
    table.iloc[:, 0] = date_range
    table.columns = ['date', 'shipping']
    table['rate'] = table['shipping'].rolling(window=90).mean()
    return table

def storage_generator(start_date, end_date, mean, sigma, limit):
    # Simulate data from a normal distribution
    date_range = pd.date_range(start=start_date, end=end_date)
    num_day = len(date_range)
    data = np.random.normal(mean, sigma, num_day)
    table = np.column_stack((np.zeros(num_day), np.arange(num_day), np.full_like(data, limit)))
    # Replace the 0 values in the second column with the simulated data
    table[:, 1] = data
    table = pd.DataFrame(table)
    table.iloc[:, 0] = date_range
    table.columns = ['date', 'current', 'limit']
    table['free'] = abs(table['limit'] - table['current'])
    return table

def generator(group, start_date, end_date):
    # weekly adjusted
    if group == 1:
        lambda_ = round(np.random.normal(1.5, 0.2, 1)[0], 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(25000, 5000, 1)[0])
        current_storage_sigma = int(np.random.normal(5000, 200, 1)[0])

        limit_storage = int(np.random.normal(50000, 10000,1)[0])
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    elif group == 2:
        lambda_ = round(np.random.normal(0.5, 0.1, 1)[0], 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(10000, 2000, 1)[0])
        current_storage_sigma = int(np.random.normal(2000, 200, 1)[0])

        limit_storage = int(np.random.normal(20000, 3000, 1)[0])
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    else:
        lambda_ = round(np.random.normal(0.1, 0.05, 1)[0], 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(5000, 1000, 1)[0])
        current_storage_sigma = int(np.random.normal(500, 100, 1)[0])

        limit_storage = int(np.random.normal(10000, 1000, 1)[0])
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    return shipping_table, storage_table


def data_generation(data_dic, start_date="2021-01-04", end_date='"2021-01-04"'):
    dist_list = list(data_dic.values())
    d0 = np.percentile(dist_list, 50)
    d1 = np.percentile(dist_list, 75)
    g1, g2, g3 = {}, {}, {}
    for key in data_dic.keys():
        if data_dic[key] < d0:
            g1[key] = data_dic[key]
        elif d0 <= data_dic[key] <= d1:
            g2[key] = data_dic[key]
        else:
            g3[key] = data_dic[key]


    g1_prob = [0.80, 0.20, 0]
    g2_prob = [0.05, 0.80, 0.15]
    g3_prob = [0.01, 0.09, 0.90]

    label_data_dic = {}
    for key in data_dic.keys():
        if key in g1:
            label = random.choices([1, 2, 3], weights=g1_prob, k=1)[0]
        elif key in g2:
            label = random.choices([1, 2, 3], weights=g2_prob, k=1)[0]
        else:
            label = random.choices([1, 2, 3], weights=g3_prob, k=1)[0]
        label_data_dic[key] = label

    label_df = pd.DataFrame(list(label_data_dic.items()), columns=['node_id', 'label'])
    label_path = f'/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/label_df.csv'
    label_df.to_csv(label_path)


    for key in label_data_dic:
        shipping_table, storage_table = generator(label_data_dic[key], start_date=start_date, end_date=end_date)

        shipping_table_path = f'/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/data_csv/{key}_shipping_table.csv'
        storage_table_path = f'/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/data_csv/{key}_storage_table.csv'

        shipping_table.to_csv(shipping_table_path)
        storage_table.to_csv(storage_table_path)

        # shipping_table.to_json(shipping_table_path, orient='index')
        # storage_table.to_json(storage_table_path, orient='index')


distance = [0,89416.5,125546.8,94314.9,95264.3,89493.7,53173.2,54089.5,48194.3,107036.5,104879.4,89608.5,31659.8,50675,78881.8,112205.2,147103.5,43688.1,147401.2,53464.5,166197.3,55501.5,47732.6,142026.5,104535.2,151954.3,37619.5,82249.9,154522.1,26430.7,52380.1,44246,40125.9,111665.3,82866,113009.9,58506.2,150411.3,94230.2,30528.1,91990.1,82161.2,70301.2,95375.7,46135.4,92788.1,85559.9,61510.3,105767.5,93530,71294.2]
dist_dic = {}
for i in range(1, len(distance)):
    dist_dic[f'test{i}@gmail.com'] = distance[i]

# print(dist_dic)
data_generation(dist_dic, start_date="2021-01-04", end_date="2023-01-01")













