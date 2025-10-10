# File: visualize_classification.py

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
from pathlib import Path
import json

def load_classified_data(file_path):
    """
    Load classified dataset from CSV or JSON.
    
    Args:
        file_path (str or Path): Path to the dataset.
        
    Returns:
        pd.DataFrame: Loaded dataset with expected columns.
    """
    file_path = Path(file_path)
    if file_path.suffix == ".csv":
        df = pd.read_csv(file_path)
    elif file_path.suffix in [".json", ".jsonl"]:
        df = pd.read_json(file_path)
    else:
        raise ValueError("Unsupported file type. Please use CSV or JSON.")
    
    # Compute log10(S2/S1) if not already present
    if 'log10_s2_s1' not in df.columns:
        df['log10_s2_s1'] = np.log10(df['s2_charge'] / df['s1_photons'])
    
    return df

def create_discrimination_plot(df, save_path=None):
    """
    Generates the S2/S1 vs. S1 scatter plot ("money plot").
    
    Args:
        df (pd.DataFrame): The classified dataset with columns:
            - s1_photons
            - s2_charge
            - log10_s2_s1
            - classification (predicted label)
            - true_label (ground truth)
        save_path (str, optional): Path to save the figure.
        
    Returns:
        matplotlib.figure.Figure
    """
    # CORRECTED: Updated the style name for compatibility with modern Matplotlib
    plt.style.use('seaborn-v0_8-whitegrid')
    fig, ax = plt.subplots(figsize=(10, 8))
    
    sns.scatterplot(
        data=df,
        x='s1_photons',
        y='log10_s2_s1',
        hue='classification',
        style='true_label',
        palette='Set2',
        alpha=0.7,
        s=60,
        ax=ax
    )
    
    ax.set_xscale('log')
    ax.set_title('AI Classification of Simulated Detector Events', fontsize=16)
    ax.set_xlabel('S1 Signal (photons) [log scale]', fontsize=12)
    ax.set_ylabel('log10(S2 / S1)', fontsize=12)
    ax.grid(True, which='both', linestyle='--', linewidth=0.5)
    ax.legend(title='Classification / Ground Truth', fontsize=10)
    
    if save_path:
        fig.savefig(save_path, dpi=300, bbox_inches='tight')
    
    return fig

def synthesize_summary(df):
    """
    Generates a text summary of classification results.
    
    Args:
        df (pd.DataFrame)
    
    Returns:
        str: Human-readable summary.
    """
    total_events = len(df)
    correct = (df['classification'] == df['true_label']).sum()
    accuracy = correct / total_events * 100
    
    nr_count = (df['true_label'] == 'NR').sum()
    er_count = (df['true_label'] == 'ER').sum()
    
    summary = (
        f"Dataset contains {total_events} events:\n"
        f"  - NR events: {nr_count}\n"
        f"  - ER events: {er_count}\n"
        f"AI classifier correctly labeled {correct} events ({accuracy:.2f}% accuracy).\n"
        f"The 'money plot' shows the separation between NR and ER events in log10(S2/S1) vs S1 space.\n"
        f"Well-separated clusters indicate good discrimination performance."
    )
    
    return summary

def main():
    # === 1. Load data ===
    # Make sure to use the correct path for your system
    data_file = "C:/Users/wrich/Downloads/CluadeMain/CODEFATHER_ClaudeSolvathon-1/data/classified_dataset.csv"
    df = load_classified_data(data_file)
    
    # === 2. Generate plot ===
    fig = create_discrimination_plot(df, save_path="money_plot.png")
    plt.show()
    
    # === 3. Generate summary ===
    summary_text = synthesize_summary(df)
    print("\n=== Classification Summary ===\n")
    print(summary_text)

if __name__ == "__main__":
    main()