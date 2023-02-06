title: Using Jupyter Notebooks in Google Colab and publishing to Google Sheets
category: Jupyter
image: ![alt_text]({static}/images/FILENAME)

[Jupyter Lab notebooks](https://jupyter.org/try-jupyter/lab/)  are a great tool for doing data analysis that is either to big for Excel, or you need to repeat the output. [Google Colab](https://colab.research.google.com/) is a hosted version of Jupyter Labs. A useful feature of Jupyter Notebooks are that you can share a notebook with someone and they can see the same output. Google Colab adds the extra bonus of allowing you to share your instance of the notebook directly with anyone who has a Google Account, or corporate Google Apps Account. These sharing features also extend to accessing data directly from Google Drive using Google's [colab library](https://github.com/googlecolab/colabtools/tree/main/google/colab).

If you are collaborating with a user who you don't want to send to the notebook, you can also make use of colab features to send data directly to Google Sheets. The setups below walk though the process of using the Pandas library to analyze some of Google Colab's [California Housing sample data](https://developers.google.com/machine-learning/crash-course/california-housing-data-description), and send the results to Google Sheets. Details are also in this [sample notebook](https://github.com/z1g1/notebooks/blob/main/Colab_demo.ipynb).

## Step by Step
1. Create a new notebook on  [Google Colab](https://colab.research.google.com/) 
1. Import both the ```pandas`` and ```google.cloab``` libraries. You can use the ```#@title ...``` nomenclature to title a Python code cell in your Notebook. These will appear in the table of contents allowing you to jump around your notebook.
![python code importing colab and pandas libraries]({static}/images/google-colab-01.png)
1. Use the ```colab``` library access the sample data.  To access the path for an item in Google Drive open the file browser (1), navigate to the file and click the three dot menu (2), then select "copy path" (3) 
![use copy path to get an object's Google Drive path]({static}/images/google-colab-02.png)
1. Create a Pandas Dataframe with the sample data, then use the ```df.shape``` method to see this data has 3000 rows and 9 columns 
![code cell showing accessing the sample data]({static}/images/google-colab-03.png)
1. To create a new Google Sheet for this data you need to authenticate your notebook to your Google Account.  You will use this auth with the [gspread](https://docs.gspread.org/en/v5.7.0/index.html) library. 
![code cell showing using gspread authentication]({static}/images/google-colab-04.png)
1. Using ```gspread``` to create a new spreadsheet and worksheet to the size of your data. then using ```worksheet.update``` put the data into Google Sheets
![Code cell using gspread update]({static}/images/google-colab-05.png)

This will have your data into Google Sheets but the one line of ```worksheet.update([df.columns.values.tolist()] + df.values.tolist())``` is doing a lot. How did this data actually get written. 

The [worksheet.update](https://docs.gspread.org/en/v5.7.0/api/models/worksheet.html#gspread.worksheet.Worksheet.update) method takes in a list of data as the ```values``` attribute. If the elements of this list are themselves lists gspread will send this data as rows and columns to write to the sheet. For example if your data is ```data = [[1,1],[2,1],[3,1]]``` when this is written to Google Sheets it will be written as three rows, with two columns each 

![a code cell passing a list of lists to gspread]({static}/images/google-colab-06.png)

![the output of the code cell above in Google Sheets]({static}/images/google-colab-07.png)

With this information we can keep diving into how ```worksheet.update([df.columns.values.tolist()] + df.values.tolist())``` wrote our data to Google Sheets. ```df.columns.values.tolist()``` calls the columns attribute from the Pandas Dataframe. This is then converted to a list using ```tolist()```. In order to have our list of lists as above this list is included inside of ```[ ]``` inside the ```worksheet.update```. If this were the only data sent to Google Sheets it would only write the column names 

To get each of the remaining 3000 rows of data ```df.values.tolist()``` is used to export the Dataframe's data to a list. This is then added to the column names list using the [add operator](https://docs.python.org/3/reference/datamodel.html#object.__add__). When this add operation is complete we have a list with 3001 elements, each of which is a row to write to Google Sheets.

![code cell showing how the columns and data were put together for Google Sheets]({static}/images/google-colab-08.png)

## What's next
This example only wrote the Dataframe directly to Google Sheets. However, you can use these same basics to write the output of any of your data analysis  Dataframes or series to Google Sheets. You can also use gspread to update existing worksheets, or create multiple sheets for each of the answers you produce. 