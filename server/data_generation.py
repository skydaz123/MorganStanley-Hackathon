
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
    for i in range(num_week):
        num_week_ship = ship_list[i]
        # create a numpy array with two columns: day index and request (yes or no)
        new_ship_data = np.zeros((7, 2))
        # choose random days in week to assign shipping
        indices = np.random.choice(np.arange(0, 7), size=num_week_ship, replace=False)
        new_ship_data[indices, 1] = 1
        try:
            table = np.vstack((table, new_ship_data))
        except:
            table = new_ship_data
    table = np.vstack((table, np.zeros((num_day % 7, 2))))
    table = pd.DataFrame(table)
    table.iloc[:, 0] = date_range
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
    return table

def generator(group, start_date, end_date):
    # weekly adjusted
    if group == 1:
        lambda_ = round(np.random.normal(1.5, 0.2, 1), 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(25000, 5000, 1))
        current_storage_sigma = int(np.random.normal(5000, 200, 1))

        limit_storage = int(np.random.normal(50000, 10000,1))
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    elif group == 2:
        lambda_ = round(np.random.normal(0.5, 0.1, 1), 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(10000, 2000, 1))
        current_storage_sigma = int(np.random.normal(2000, 200, 1))

        limit_storage = int(np.random.normal(20000, 3000, 1))
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    else:
        lambda_ = round(np.random.normal(0.1, 0.05, 1), 2)
        shipping_table = shipping_times_generator(rate=lambda_, start_date=start_date, end_date=end_date)

        current_storage_mu = int(np.random.normal(5000, 1000, 1))
        current_storage_sigma = int(np.random.normal(500, 100, 1))

        limit_storage = int(np.random.normal(10000, 1000, 1))
        storage_table = storage_generator(start_date=start_date, end_date=end_date,
                                          mean=current_storage_mu, sigma=current_storage_sigma,
                                          limit=limit_storage)

    return shipping_table, storage_table


def data_generation(data_dic, start_date="2021-01-04", end_date='"2021-01-04"'):
    dist_list = list(data_dic.keys())
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

    for key in label_data_dic:
        shipping_table, storage_table = generator(label_data_dic[key], start_date=start_date, end_date=end_date)













