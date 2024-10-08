import pandas as pd

# Assuming your data is in a DataFrame called df
df = pd.read_excel('master_file.xlsx')  # or however you're loading your data

# Remove double quotes from the first column (assuming it's the one you want to modify)
df.iloc[1000:50972, 0] = df.iloc[1000:50972, 0].str.replace('"', '')

# Save the modified DataFrame back to a CSV file
df.to_xlsx('modified_file.xlsx', index=False)