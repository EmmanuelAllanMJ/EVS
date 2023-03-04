import os
import shutil
import datetime
import time

folder_path = './shots'

while True:
    # Get the current time
    now = datetime.datetime.now()

    # Traverse the folder structure and delete files and subfolders if they are old enough
    if os.path.exists(folder_path):
        for root, dirs, files in os.walk(folder_path, topdown=False):
            for name in files:
                file_path = os.path.join(root, name)
                file_creation_time = datetime.datetime.fromtimestamp(os.path.getctime(file_path))
                time_difference = (now - file_creation_time).total_seconds()
                if time_difference >= 24 * 60 * 60:
                    os.remove(file_path)
            for name in dirs:
                dir_path = os.path.join(root, name)
                dir_creation_time = datetime.datetime.fromtimestamp(os.path.getctime(dir_path))
                time_difference = (now - dir_creation_time).total_seconds()
                if time_difference >= 24 * 60 * 60:
                    shutil.rmtree(dir_path)

    # Exit the loop if the folder has been deleted
    else:
        break

    time.sleep(30)  # Wait for 30 seconds before checking again
