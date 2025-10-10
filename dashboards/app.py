import streamlit as st
import pandas as pd
import os
import sys

# --- Add project root to Python path to allow importing generate_plot ---
# This ensures the app can find the generate_plot.py file
script_dir = os.path.dirname(_file_)
project_root = os.path.abspath(os.path.join(script_dir, '..'))
sys.path.append(project_root)

# --- Import the plotting function from the separate file ---
from generate_plot import create_discrimination_plot


# --- Streamlit App Main Logic ---
st.set_page_config(layout="wide")

st.title("Dark Matter Scribe")
st.markdown("An AI system for classifying and reasoning about dark matter detector events.")

@st.cache_data
def load_data(filepath):
    """Cached function to load the dataset."""
    if os.path.exists(filepath):
        return pd.read_csv(filepath)
    return None

# --- Main App ---
# Construct the path to the data file relative to the script's location
DATA_FILE = os.path.join(project_root, 'data', 'classified_dataset.csv')
df_full = load_data(DATA_FILE)

if df_full is not None:
    # --- Clean data by removing API/JSON errors for analysis ---
    error_states = ["JSON Error", "Parsing Error"]
    df = df_full[~df_full['classification'].isin(error_states)].copy()
    
    # --- Sidebar for Filters ---
    st.sidebar.header("Filter Options")
    
    all_classifications = sorted(df['classification'].unique())
    selected_classifications = st.sidebar.multiselect(
        "Filter by AI Classification:",
        options=all_classifications,
        default=all_classifications
    )

    all_true_labels = sorted(df['true_label'].unique())
    selected_true_labels = st.sidebar.multiselect(
        "Filter by True Label:",
        options=all_true_labels,
        default=all_true_labels
    )
    
    # Apply filters to the dataframe that will be used for plotting and inspection
    df_filtered = df[
        df['classification'].isin(selected_classifications) &
        df['true_label'].isin(selected_true_labels)
    ]

    # --- Performance Metrics ---
    st.markdown("---")
    st.header("AI Performance Summary")
    
    total_events = len(df)
    correct_predictions = (df['classification'] == df['true_label']).sum()
    accuracy = (correct_predictions / total_events) * 100 if total_events > 0 else 0
    
    metric_col1, metric_col2, metric_col3 = st.columns(3)
    with metric_col1:
        st.metric("Total Valid Events", f"{total_events}")
    with metric_col2:
        st.metric("Correct Classifications", f"{correct_predictions}")
    with metric_col3:
        st.metric("Overall Accuracy", f"{accuracy:.2f}%")
    st.markdown("---")

    # --- Main Layout: Two columns for plot and inspector ---
    col1, col2 = st.columns([2, 1]) 

    with col1:
        st.header("Event Classification Map")
        if df_filtered.empty:
            st.warning("No data matches the current filter settings.")
        else:
            # Call the imported function from generate_plot.py
            fig = create_discrimination_plot(df_filtered) 
            if fig:
                st.pyplot(fig)
            else:
                st.error("The dataset is missing columns required for the plot.")

    with col2:
        st.header("Event Inspector")
        
        required_inspector_cols = ['event_id', 'true_label', 'classification', 'confidence', 'reasoning']
        if not all(col in df.columns for col in required_inspector_cols):
             st.error("The dataset is missing required columns for the inspector.")
        else:
            # Use the filtered dataframe for the dropdown to keep it in sync with the plot
            event_ids = df_filtered['event_id'].tolist()
            if not event_ids:
                st.warning("No events match the current filter settings.")
            else:
                selected_id = st.selectbox("Select an Event ID to inspect:", event_ids)
                
                if selected_id is not None:
                    # Retrieve full details from the original (unfiltered) dataframe
                    event_details = df[df['event_id'] == selected_id].iloc[0]
                    st.subheader(f"Details for Event ID: {selected_id}")
                    
                    metric_col1_insp, metric_col2_insp, metric_col3_insp = st.columns(3)
                    with metric_col1_insp:
                        st.metric("True Label", event_details['true_label'])
                    with metric_col2_insp:
                        st.metric("AI Classification", event_details['classification'])
                    with metric_col3_insp:
                        st.metric("AI Confidence", f"{event_details['confidence']:.2f}")

                    st.markdown("---")
                    st.subheader("AI Physicist's Reasoning")
                    st.info(event_details['reasoning'])
else:
    st.error(f"Could not find the dataset at '{DATA_FILE}'.")
    st.warning("Please ensure you have run the src/classify.py script to generate it.")