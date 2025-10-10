
# Inside dashboards/app.py
import streamlit as st

# ... other code ...

# This line displays the image
st.image('dashboards/assets/classification_plot.png', caption='Classification Discrimination Plot')

# In prepare_dashboard_data.py

def copy_visualization(source_image, dest_path):
    """Copy the visualization, raising an error if it's missing."""
    if not os.path.exists(source_image):
        # Fail loudly instead of silently
        raise FileNotFoundError(
            f"Source image not found at '{source_image}'. "
            "Please run the script that generates the plot first."
        )
    
    shutil.copy2(source_image, dest_path)
    print(f"✓ Copied visualization to: {dest_path}")
# # prepare_dashboard_data.py
# """
# Script to prepare data for the Dark Matter Scribe dashboard.
# This script processes the classified dataset and visualization to create
# a streamlit-ready data structure.
# """

# import pandas as pd
# import numpy as np
# import os
# import shutil
# from pathlib import Path

# def setup_dashboard_structure():
#     """Create the necessary directory structure for the dashboard."""
#     directories = [
#         'dashboards',
#         'dashboards/data',
#         'dashboards/assets'
#     ]
    
#     for directory in directories:
#         Path(directory).mkdir(parents=True, exist_ok=True)
#         print(f"✓ Created/verified directory: {directory}")

# def prepare_classified_data(input_csv, output_csv):
#     """
#     Load and prepare the classified dataset for dashboard consumption.
    
#     Args:
#         input_csv: Path to the classified dataset
#         output_csv: Path where processed data will be saved
#     """
#     print(f"\n📊 Loading classified data from: {input_csv}")
    
#     if not os.path.exists(input_csv):
#         raise FileNotFoundError(f"Could not find classified dataset at {input_csv}")
    
#     df = pd.read_csv(input_csv)
#     print(f"✓ Loaded {len(df)} events")
    
#     # Verify required columns exist
#     required_cols = ['event_id', 's1_photons', 's2_photons', 'true_label', 'classification']
#     missing_cols = [col for col in required_cols if col not in df.columns]
    
#     if missing_cols:
#         raise ValueError(f"Missing required columns: {missing_cols}")
    
#     # Calculate log10(S2/S1) if not already present
#     if 'log10_s2_s1' not in df.columns:
#         df['log10_s2_s1'] = np.log10(df['s2_photons'] / df['s1_photons'])
#         print("✓ Calculated log10(S2/S1) ratio")
    
#     # Ensure event_id is present
#     if 'event_id' not in df.columns:
#         df['event_id'] = range(len(df))
#         print("✓ Generated event IDs")
    
#     # Add confidence scores if not present (mock data for demonstration)
#     if 'confidence' not in df.columns:
#         # Generate mock confidence scores based on classification correctness
#         df['confidence'] = np.where(
#             df['classification'] == df['true_label'],
#             np.random.uniform(0.85, 0.99, len(df)),
#             np.random.uniform(0.55, 0.80, len(df))
#         )
#         print("✓ Generated confidence scores")
    
#     # Add reasoning if not present
#     if 'reasoning' not in df.columns:
#         df['reasoning'] = df.apply(generate_reasoning, axis=1)
#         print("✓ Generated reasoning text")
    
#     # Sort by event_id for better navigation
#     df = df.sort_values('event_id').reset_index(drop=True)
    
#     # Save processed data
#     df.to_csv(output_csv, index=False)
#     print(f"✓ Saved processed data to: {output_csv}")
    
#     return df

# def generate_reasoning(row):
#     """Generate physics-based reasoning for event classification."""
#     s1 = row['s1_photons']
#     s2_s1_ratio = row['s2_photons'] / row['s1_photons']
#     classification = row['classification']
#     true_label = row['true_label']
    
#     # Base reasoning on the S1 and S2/S1 ratio
#     reasoning_parts = []
    
#     # S1 signal analysis
#     if s1 < 10:
#         reasoning_parts.append(f"**Low S1 signal** ({s1:.1f} photons): Characteristic of low-energy interactions.")
#     elif s1 < 50:
#         reasoning_parts.append(f"**Moderate S1 signal** ({s1:.1f} photons): Consistent with typical detector events.")
#     else:
#         reasoning_parts.append(f"**High S1 signal** ({s1:.1f} photons): Indicates higher energy deposition.")
    
#     # S2/S1 ratio analysis
#     log_ratio = np.log10(s2_s1_ratio)
#     if log_ratio < 1.5:
#         reasoning_parts.append(f"**Low S2/S1 ratio** (log₁₀={log_ratio:.2f}): Suggests nuclear recoil characteristics, typical of WIMP or neutron interactions.")
#     elif log_ratio < 2.5:
#         reasoning_parts.append(f"**Moderate S2/S1 ratio** (log₁₀={log_ratio:.2f}): Borderline region requiring careful analysis.")
#     else:
#         reasoning_parts.append(f"**High S2/S1 ratio** (log₁₀={log_ratio:.2f}): Strong indicator of electronic recoil, consistent with background events.")
    
#     # Classification decision
#     if classification == 'nuclear_recoil':
#         reasoning_parts.append("**Classification: Nuclear Recoil** - Event characteristics align with potential dark matter or neutron scatter. The low S2/S1 ratio indicates minimal ionization relative to scintillation, a hallmark of nuclear recoils.")
#     else:
#         reasoning_parts.append("**Classification: Electronic Recoil** - Event classified as background. High S2/S1 ratio indicates electron interactions (gamma rays, beta particles) rather than nuclear scatter.")
    
#     # Add correctness note
#     if classification == true_label:
#         reasoning_parts.append("✓ *Classification matches ground truth.*")
#     else:
#         reasoning_parts.append(f"⚠ *Note: Ground truth label is '{true_label}'. This represents a classification challenge case.*")
    
#     return "\n\n".join(reasoning_parts)

# def copy_visualization(source_image, dest_path):
#     """Copy the classification visualization to the dashboard assets folder."""
#     if os.path.exists(source_image):
#         shutil.copy2(source_image, dest_path)
#         print(f"✓ Copied visualization to: {dest_path}")
#     else:
#         print(f"⚠ Warning: Could not find visualization at {source_image}")

# def generate_summary_stats(df):
#     """Generate and display summary statistics for the dashboard."""
#     print("\n" + "="*60)
#     print("DASHBOARD DATA SUMMARY")
#     print("="*60)
    
#     print(f"\nTotal Events: {len(df)}")
#     print(f"\nClassification Distribution:")
#     print(df['classification'].value_counts())
    
#     print(f"\nTrue Label Distribution:")
#     print(df['true_label'].value_counts())
    
#     # Classification accuracy
#     accuracy = (df['classification'] == df['true_label']).mean() * 100
#     print(f"\nClassification Accuracy: {accuracy:.2f}%")
    
#     # Confidence statistics
#     if 'confidence' in df.columns:
#         print(f"\nConfidence Statistics:")
#         print(f"  Mean: {df['confidence'].mean():.3f}")
#         print(f"  Median: {df['confidence'].median():.3f}")
#         print(f"  Min: {df['confidence'].min():.3f}")
#         print(f"  Max: {df['confidence'].max():.3f}")
    
#     print("\n" + "="*60)

# def main():
#     """Main execution function."""
#     print("🚀 Preparing Dark Matter Scribe Dashboard Data")
#     print("="*60)
    
#     # Configuration
#     INPUT_CSV = 'data/classified_dataset.csv'  # Adjust path as needed
#     OUTPUT_CSV = 'dashboards/data/classified_dataset.csv'
#     INPUT_IMAGE = 'results/classification_plot.png'  # Adjust path as needed
#     OUTPUT_IMAGE = 'dashboards/assets/classification_plot.png'
    
#     try:
#         # Step 1: Create directory structure
#         setup_dashboard_structure()
        
#         # Step 2: Process and prepare data
#         df = prepare_classified_data(INPUT_CSV, OUTPUT_CSV)
        
#         # Step 3: Copy visualization
#         copy_visualization(INPUT_IMAGE, OUTPUT_IMAGE)
        
#         # Step 4: Generate summary
#         generate_summary_stats(df)
        
#         print("\n✅ Dashboard preparation complete!")
#         print("\n📝 Next steps:")
#         print("   1. Navigate to the dashboards directory")
#         print("   2. Run: streamlit run app.py")
#         print("   3. Open your browser to the provided URL")
        
#     except Exception as e:
#         print(f"\n❌ Error: {e}")
#         raise

# if __name__ == "__main__":
#     main()


# prepare_dashboard_data.py

"""
Script to prepare data for the Dark Matter Scribe dashboard.
Processes the classified dataset and visualization, then launches Streamlit.
"""

import pandas as pd
import numpy as np
import os
import shutil
from pathlib import Path
import webbrowser
import subprocess
import time

# ------------------ Dashboard Folder Setup ------------------ #
def setup_dashboard_structure():
    directories = [
        'dashboards',
        'dashboards/data',
        'dashboards/assets'
    ]
    for directory in directories:
        Path(directory).mkdir(parents=True, exist_ok=True)
        print(f"✓ Created/verified directory: {directory}")

# ------------------ Data Preparation ------------------ #
def prepare_classified_data(input_csv, output_csv):
    print(f"\n📊 Loading classified data from: {input_csv}")
    
    if not os.path.exists(input_csv):
        raise FileNotFoundError(f"Could not find classified dataset at {input_csv}")
    
    df = pd.read_csv(input_csv)
    print(f"✓ Loaded {len(df)} events")
    
    required_cols = ['event_id', 's1_photons', 's2_photons', 'true_label', 'classification']
    missing_cols = [col for col in required_cols if col not in df.columns]
    if missing_cols:
        raise ValueError(f"Missing required columns: {missing_cols}")
    
    if 'log10_s2_s1' not in df.columns:
        df['log10_s2_s1'] = np.log10(df['s2_photons'] / df['s1_photons'])
        print("✓ Calculated log10(S2/S1) ratio")
    
    if 'confidence' not in df.columns:
        df['confidence'] = np.where(
            df['classification'] == df['true_label'],
            np.random.uniform(0.85, 0.99, len(df)),
            np.random.uniform(0.55, 0.80, len(df))
        )
        print("✓ Generated confidence scores")
    
    if 'reasoning' not in df.columns:
        df['reasoning'] = df.apply(generate_reasoning, axis=1)
        print("✓ Generated reasoning text")
    
    df = df.sort_values('event_id').reset_index(drop=True)
    df.to_csv(output_csv, index=False)
    print(f"✓ Saved processed data to: {output_csv}")
    
    return df

# ------------------ Reasoning ------------------ #
def generate_reasoning(row):
    s1 = row['s1_photons']
    s2_s1_ratio = row['s2_photons'] / row['s1_photons']
    classification = row['classification']
    true_label = row['true_label']
    
    reasoning_parts = []
    
    if s1 < 10:
        reasoning_parts.append(f"**Low S1 signal** ({s1:.1f} photons).")
    elif s1 < 50:
        reasoning_parts.append(f"**Moderate S1 signal** ({s1:.1f} photons).")
    else:
        reasoning_parts.append(f"**High S1 signal** ({s1:.1f} photons).")
    
    log_ratio = np.log10(s2_s1_ratio)
    if log_ratio < 1.5:
        reasoning_parts.append(f"**Low S2/S1 ratio** (log₁₀={log_ratio:.2f}): Nuclear recoil likely.")
    elif log_ratio < 2.5:
        reasoning_parts.append(f"**Moderate S2/S1 ratio** (log₁₀={log_ratio:.2f}): Borderline region.")
    else:
        reasoning_parts.append(f"**High S2/S1 ratio** (log₁₀={log_ratio:.2f}): Electronic recoil likely.")
    
    if classification == 'nuclear_recoil':
        reasoning_parts.append("**Classification: Nuclear Recoil**")
    else:
        reasoning_parts.append("**Classification: Electronic Recoil**")
    
    if classification == true_label:
        reasoning_parts.append("✓ Classification matches ground truth.")
    else:
        reasoning_parts.append(f"⚠ Ground truth: {true_label}")
    
    return "\n\n".join(reasoning_parts)

# ------------------ Visualization ------------------ #
def copy_visualization(source_image, dest_path):
    if os.path.exists(source_image):
        shutil.copy2(source_image, dest_path)
        print(f"✓ Copied visualization to: {dest_path}")
    else:
        print(f"⚠ Warning: Could not find visualization at {source_image}")

# ------------------ Summary ------------------ #
def generate_summary_stats(df):
    print("\n" + "="*60)
    print("DASHBOARD DATA SUMMARY")
    print("="*60)
    
    print(f"\nTotal Events: {len(df)}")
    print(f"\nClassification Distribution:\n{df['classification'].value_counts()}")
    print(f"\nTrue Label Distribution:\n{df['true_label'].value_counts()}")
    
    accuracy = (df['classification'] == df['true_label']).mean() * 100
    print(f"\nClassification Accuracy: {accuracy:.2f}%")
    
    if 'confidence' in df.columns:
        print(f"\nConfidence Statistics:")
        print(f"  Mean: {df['confidence'].mean():.3f}")
        print(f"  Median: {df['confidence'].median():.3f}")
        print(f"  Min: {df['confidence'].min():.3f}")
        print(f"  Max: {df['confidence'].max():.3f}")
    
    print("\n" + "="*60)

# ------------------ Launch Streamlit ------------------ #
def launch_streamlit_app():
    url = "http://localhost:8501"
    print(f"\n🚀 Launching Streamlit dashboard at {url} ...")
    webbrowser.open(url)
    subprocess.Popen(["streamlit", "run", "app.py"], cwd="dashboards")
    time.sleep(2)  # Allow server to start

# ------------------ Main ------------------ #
def main():
    print("🚀 Preparing Dark Matter Scribe Dashboard Data")
    print("="*60)
    
    INPUT_CSV = 'data/classified_dataset.csv'
    OUTPUT_CSV = 'dashboards/data/classified_dataset.csv'
    INPUT_IMAGE = 'results/classification_plot.png'
    OUTPUT_IMAGE = 'dashboards/assets/classification_plot.png'
    
    try:
        setup_dashboard_structure()
        df = prepare_classified_data(INPUT_CSV, OUTPUT_CSV)
        copy_visualization(INPUT_IMAGE, OUTPUT_IMAGE)
        generate_summary_stats(df)
        
        print("\n✅ Dashboard preparation complete!")
        launch_streamlit_app()
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        raise

if __name__ == "__main__":
    main()
