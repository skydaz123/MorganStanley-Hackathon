import numpy as np
import pandas as pd
from statsmodels.distributions.empirical_distribution import ECDF

def distance_indentity(dij, threshold_T):
    if dij <= threshold_T:
        return 1
    return 0

# scores are supposed to be updated weekly
def score(distance_data, label_dic, shipping_table, storage_table, threshold_T):
    ship_rate = shipping_table.columns[1]
    ecdf_ship = ECDF(shipping_table[ship_rate])
    shipping_table['ship_rate'] = ecdf_ship(shipping_table[ship_rate])

    storage_remaining = storage_table.columns[1]
    ecdf_storage = ECDF(storage_table[storage_remaining])
    storage_table['storage_remaining'] = ecdf_storage(storage_table[storage_remaining])

    # distance_data.set_index(distance_data.columns[0], inplace=True)

    X3_dic = {}
    weight_adjusted_level = {1: 1, 2: 0.9, 3: 0.7}
    for key in label_dic.keys():
        nom = 0
        denom = 0.00000000001
        for key1 in label_dic.keys():
            if key != key1:
                if label_dic[key1] == 3:
                    dij = distance_data.loc[key, key1]
                    wij = 1/dij
                    nom += dij*wij*distance_indentity(dij, threshold_T)
                    denom += wij*distance_indentity(dij, threshold_T)

        X3_dic[key] = nom/(denom * weight_adjusted_level[label_dic[key]])

    ecdf_mean_dis = ECDF(list(X3_dic.values()))
    for key in X3_dic.keys():
        X3_dic[key] = ecdf_mean_dis(X3_dic[key])

    final_df = pd.DataFrame({
        'node_id': shipping_table[shipping_table.columns[0]],
        'ship_rate': shipping_table['ship_rate']
                             })

    final_df = pd.merge(final_df, storage_table[['node_id', 'storage_remaining']], on='node_id')

    final_df['mean_distance'] = final_df['node_id'].map(X3_dic)

    w = [0.2, 0.4, 0.4]
    final_df['score'] = w[0]*(1-final_df['ship_rate']) + w[1]*final_df['storage_remaining'] \
                        + w[2]*(1-final_df['mean_distance'])

    return final_df


























