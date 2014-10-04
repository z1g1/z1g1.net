 #!/usr/bin/env ruby

require "csv"
require "erb"

class LinkPage
	attr_accessor :links

	def initialize(links)
		@links = links
	end

  def render path
    content = File.read(File.expand_path(path))
    t = ERB.new(content)
    t.result(binding)
  end
end

def getLinks()
	puts "[INFO] Downloading links.csv.txt from Dropbox"
	`wget https://www.dropbox.com/s/15ypcn9mdkmc54o/links.csv.txt` 
	begin 
		sourceData = File.open('./links.csv.txt','r')
	rescue
		puts "[ERROR] Undable to open the links file"
		exit
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

def fixTitle(input)
	output = input.gsub('"','""')
	return output
end

def parseLinks(file,links,header)
	counter = 1

	CSV.foreach(file, { :col_sep => "\\" , :quote_char => "~"}) do |row|

		link = Hash.new

		if counter == 1
			row.each_with_index do |cell,key|
				header[cell.downcase] = key
				next
			end
		else

			link["date"] = fixTime(row[header["time"]])
			link["title"] = row[header["title"]]
			link["link"] = row[header["link"]]
			
	
		end

		links.push(link)
	
		counter = counter + 1

	end

	return links
end


links = Array.new
inputFile = "./links.csv.txt"
header = Hash.new
template = "./_layouts/links-index.html.erb"
target = File.open("./links/index.html", 'w')

getLinks()

parseLinks(inputFile,links,header)

linkPage = LinkPage.new(links)

target.write(linkPage.render(template))
