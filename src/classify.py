import os
import pandas as pd
import anthropic
import time
from tqdm import tqdm


# ✅ Dummy classify_event (replace this later with your real Claude logic)
def classify_event(row, client):
    """
    Dummy event classification using Anthropic API.
    Replace this with your actual prompt logic.
    """
    try:
        # Example call (commented out until you have Claude access)
        # response = client.messages.create(
        #     model="claude-3-sonnet-20240229",
        #     max_tokens=50,
        #     messages=[{"role": "user", "content": f"Classify this event: {row}"}]
        # )
        # classification = response.content[0].text.strip()

        classification = "Sample_Category"  # ← Placeholder for now
        return {'event_id': row['event_id'], 'classification': classification}

    except Exception as e:
        print(f"API error for event {row.get('event_id', 'unknown')}: {e}")
        return None


def main():
    """
    Main function to load data, classify all events, and save the results.
    """
    # ✅ Step 1: Build a safe absolute path for the dataset
    input_path = r"C:\Users\wrich\Downloads\CluadeMain\CODEFATHER_ClaudeSolvathon-1\data\dataset.csv"

    if not os.path.exists(input_path):
        print(f"❌ Error: Input file not found at {input_path}")
        print("Please run src/simulate.py first to generate the dataset.")
        return

    # ✅ Step 2: Load dataset
    try:
        df = pd.read_csv(input_path)
        print(f"✅ Loaded dataset successfully: {len(df)} rows")
    except Exception as e:
        print(f"❌ Error reading dataset: {e}")
        return

    # ✅ Step 3: Initialize Anthropic client
    try:
        client = anthropic.Anthropic()
    except Exception as e:
        print(f"❌ Error initializing Anthropic client: {e}")
        print("Please ensure ANTHROPIC_API_KEY is set correctly.")
        return

    # ✅ Step 4: Classify events
    results = []
    print("🚀 Starting event classification...")
    for index, row in tqdm(df.iterrows(), total=df.shape[0]):
        try:
            result = classify_event(row, client)
            if result:
                results.append(result)
        except Exception as e:
            print(f"⚠️ Error classifying event {index}: {e}")
        time.sleep(0.5)  # avoid API rate limits

    if not results:
        print("❌ No events were successfully classified. Exiting.")
        return

    # ✅ Step 5: Merge and save
    results_df = pd.DataFrame(results)
    df['event_id'] = df['event_id'].astype(int)
    results_df['event_id'] = results_df['event_id'].astype(int)

    output_path = os.path.join(os.path.dirname(input_path), "classified_dataset.csv")
    classified_df = pd.merge(df, results_df, on='event_id', how='left')
    classified_df.to_csv(output_path, index=False)

    print(f"\n✅ Classification complete. Saved to {output_path}")
    print("\n📊 Preview of classified data:")
    print(classified_df.head())


if __name__ == "__main__":
    main()
