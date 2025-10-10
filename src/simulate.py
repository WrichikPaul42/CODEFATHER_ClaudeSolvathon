# src/simulate.py

import pandas as pd
import numpy as np
import os

def generate_correlated_events(n_events, mean_s1, mean_s2, s1_std, s2_std, correlation):
    """
    Generates correlated S1 and S2 events using a multivariate normal distribution.
    """
    mean = [mean_s1, mean_s2]
    cov_s1_s2 = correlation * s1_std * s2_std
    cov_matrix = [[s1_std*2, cov_s1_s2], [cov_s1_s2, s2_std*2]]
    
    events = np.random.multivariate_normal(mean, cov_matrix, n_events)
    events[events < 0] = 0  # Enforce physical constraint (no negative signals)
    return events

def generate_dataset(num_events=500, signal_fraction=0.2):
    """
    Generates a full dataset of mixed Nuclear Recoil (NR) and Electronic Recoil (ER) events.
    """
    n_signal = int(num_events * signal_fraction)
    n_background = num_events - n_signal

    events_list = []

    # --- Generate Nuclear Recoil (NR) events ---
    nr_energies = np.random.exponential(scale=5.0, size=n_signal) + 2.0

    for energy in nr_energies:
        mean_s1 = energy * 2.0
        mean_s2 = energy * 50.0
        s1_std = np.sqrt(mean_s1) * 0.5
        s2_std = np.sqrt(mean_s2) * 0.5
        correlation = -0.6

        s1, s2 = generate_correlated_events(1, mean_s1, mean_s2, s1_std, s2_std, correlation)[0]
        
        events_list.append({
            'true_label': 'Nuclear Recoil',
            'recoil_energy_keV': energy,
            's1_photons': s1,
            's2_charge': s2
        })

    # --- Generate Electronic Recoil (ER) events ---
    er_energies = np.random.uniform(low=2.0, high=50.0, size=n_background)

    for energy in er_energies:
        mean_s1 = energy * 1.5
        mean_s2 = energy * 200.0
        s1_std = np.sqrt(mean_s1) * 0.7
        s2_std = np.sqrt(mean_s2) * 0.7
        correlation = -0.4

        s1, s2 = generate_correlated_events(1, mean_s1, mean_s2, s1_std, s2_std, correlation)[0]
        
        events_list.append({
            'true_label': 'Electronic Recoil',
            'recoil_energy_keV': energy,
            's1_photons': s1,
            's2_charge': s2
        })

    # --- Finalize DataFrame ---
    df = pd.DataFrame(events_list)
    df = df.sample(frac=1).reset_index(drop=True)
    df['event_id'] = df.index

    epsilon = 1e-6
    df['log10_s2_s1'] = np.log10((df['s2_charge'] + epsilon) / (df['s1_photons'] + epsilon))
    
    return df

if __name__ == '__main__':
    print("Generating simulated dark matter detector dataset...")

    output_dir = 'data'
    os.makedirs(output_dir, exist_ok=True)

    dataset = generate_dataset(num_events=500, signal_fraction=0.2)
    output_path = os.path.join(output_dir, 'dataset.csv')
    dataset.to_csv(output_path, index=False)

    print(f"Dataset with {len(dataset)} events saved to {output_path}")
    print("\nDataset Head:")
    print(dataset.head())