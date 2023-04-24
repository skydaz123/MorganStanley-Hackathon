from Scoring import score
import pandas as pd
from matrix_manipulation import distance_data

INPUT_FILE = '/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/data_csv'
date_request = ['2022-12-28','2022-12-29','2022-12-30','2022-12-31','2023-01-01']

label_data = pd.read_csv('label_df.csv', index_col=0)
label_dic = label_data.set_index('node_id')['label'].to_dict()

distance = [0,89416.5,125546.8,94314.9,95264.3,89493.7,53173.2,54089.5,48194.3,107036.5,104879.4,89608.5,31659.8,50675,78881.8,112205.2,147103.5,43688.1,147401.2,53464.5,166197.3,55501.5,47732.6,142026.5,104535.2,151954.3,37619.5,82249.9,154522.1,26430.7,52380.1,44246,40125.9,111665.3,82866,113009.9,58506.2,150411.3,94230.2,30528.1,91990.1,82161.2,70301.2,95375.7,46135.4,92788.1,85559.9,61510.3,105767.5,93530,71294.2]
dist_dic = {}
for i in range(1, len(distance)):
    dist_dic[f'test{i}@gmail.com'] = distance[i]

limit_dic = {'node_id': [],
                'limit': []}
for key in dist_dic:
    storage_table = pd.read_csv(f'{INPUT_FILE}/{key}_storage_table.csv', index_col=1)
    limit_dic['node_id'].append(key)
    limit_dic['limit'].append(storage_table.loc['2022-12-28', 'limit'])

pd.DataFrame(limit_dic).to_csv('/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/limit.csv')

for date in date_request:
    rate_dic = {'node_id': [],
                'rate': []}

    free_dic = {'node_id': [],
                'remaining': []}

    for key in dist_dic:
        shipping_table = pd.read_csv(f'{INPUT_FILE}/{key}_shipping_table.csv', index_col=1)
        rate_dic['node_id'].append(key)
        rate_dic['rate'].append(shipping_table.loc[date, 'rate'])

        storage_table = pd.read_csv(f'{INPUT_FILE}/{key}_storage_table.csv', index_col=1)
        free_dic['node_id'].append(key)
        free_dic['remaining'].append(storage_table.loc[date, 'free'])

    rate_table = pd.DataFrame(rate_dic)
    free_table = pd.DataFrame(free_dic)

    score_table = score(distance_data=distance_data, label_dic=label_dic, shipping_table=rate_table,
                        storage_table=free_table, threshold_T=55000)

    score_path = f'/Users/tanvu10/PycharmProjects/joker/MS_Hackathon/score_json/{date}_score.json'
    score_table.to_json(score_path, orient='records')



