 #!/usr/bin/env ruby

require "csv"

def getLinks()
	puts "[INFO] Downloading links.csv.txt from Dropbox"
	`wget https://www.dropbox.com/s/15ypcn9mdkmc54o/links.csv.txt` 
	begin 
		sourceData = File.open('./links.csv.txt','r')
	rescue
		puts "[ERROR] Undable to open the links file"
	end

	return sourceData
end

def fixTime(input)
	# Tumblr returns the date as a string like "October 14, 2013 at 08:12AM"
	# function to convert it to a Date object

	stripTime = input.split(' at ').to_s
	date = Date.parse(stripTime)
	
	return date
end

def parseLinks(file,links,header)
	counter = 1

	link = Hash.new

	CSV.foreach(file, { :col_sep => "\\" }) do |row|
		if counter == 1
			row.each_with_index do |cell,key|
				header[cell.downcase] = key
			end
		else

			link["date"] = fixTime(row[header["time"]])
			link["title"] = row[header["title"]]
			link["link"] = row[header["link"]]
	
			links.push(link)	
		end
	
		counter = counter + 1
	end
end

links = Array.new
inputFile = "./links.csv.txt"
header = Hash.new

#getLinks()

parseLinks(inputFile,links,header)

puts links.length
