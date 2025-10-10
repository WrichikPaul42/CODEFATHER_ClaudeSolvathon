import os
import json
import anthropic

try:
    # The client automatically reads the ANTHROPIC_API_KEY from your environment
    # Make sure you have run 'export ANTHROPIC_API_KEY="your-key-here"'
    # or have it in a .env file that your environment loads.
    client = anthropic.Anthropic()

    prompt = """
    Generate a single synthetic WIMP event as a JSON object.
    The event should have keys: 's1_photons', 's2_charge', and 'recoil_energy_keV'.
    Ensure the values are physically plausible for a low-energy nuclear recoil.
    For example, s1 should be small, and s2 should be relatively low for that s1.
    Respond with ONLY the JSON object.
    """

    print("Sending 'Hello, Physics' request to Claude...")
    message = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=1024,
        messages=[{"role": "user", "content": prompt}]
    )

    # --- THIS IS THE CORRECTED LINE ---
    # We get the first content block from the list before accessing its .text attribute.
    response_text = message.content[0].text
    
    print("\nRaw Response from Claude:")
    print(response_text)

    # Attempt to parse the JSON
    # It's also good practice to strip whitespace in case the model adds it
    event_data = json.loads(response_text.strip())
    print("\nSuccessfully parsed JSON:")
    print(event_data)
    print("\nAPI connection confirmed. Response format is correct.")

except anthropic.APIStatusError as e:
    print("\nAn API error occurred:")
    print(f"  Status code: {e.status_code}")
    print(f"  Response: {e.response}")
    print("\nPlease check that your ANTHROPIC_API_KEY is set correctly and is valid.")
except Exception as e:
    print(f"\nAn unexpected error occurred: {e}")
    print("Please check your code and API key configuration.")