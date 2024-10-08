import os
import pandas as pd

data_folder = os.path.join('.', 'data')

df_list = []
for file in os.listdir(data_folder):
    if file.endswith('.xlsx'):
        print(f'Loading file {file}...')
        file_path = os.path.join(data_folder, file)
        try:
            # Read the file as UTF-16LE encoded CSV
            df = pd.read_excel(file_path)
            # df_list.append(df, sheet_name = 'Data')
            df_list.append(df)
            print(f"Successfully loaded {file}")
        except Exception as e:
            print(f"Error loading {file}: {str(e)}")

if df_list:
    df_master = pd.concat(df_list, axis=0, ignore_index=True)
    output_file = 'master_file.xlsx'
    df_master.to_excel(output_file, index=False)
    print(f"Master file saved as {output_file}")
else:
    print("No files were successfully loaded.")