require 'date'

puts "[INFO] Create new post"

def gather_header()
	images = ["Default","facebook-logo.jpg","github-logo.jpg","Good-Reads-Logo.png","google-plus-logo.jpg","Netrunner_logo.jpg","Netrunner_logo_criminals.jpg", "Netrunner_logo_anarchs.jpg", "Netrunner_logo_nbn.jpg", "Netrunner_logo_jinteki.jpg", "Netrunner_logo_weyland.jpg","Netrunner_logo_hb.jpg", "Netrunner_logo_shapers.jpg", "privateer-logo.png","Reddit-logo.jpg","Twitter-logo.jpg"]

	puts "[INFO] Post title?"
	post_date = DateTime.now.strftime("%Y-%m-%d")
	post_title = STDIN.gets.chomp()
	post_filename = "_posts/#{post_date}-#{post_title.downcase.gsub(" ","-")}.md"

	puts "[INFO] Post Tags?"
	post_tags =  STDIN.gets.chomp()

	puts "[INFO] Post Image? Defualt value blank"
	images.sort.each_with_index do |image,key|
		puts "#{key}. #{image}"
	end
	post_image_selection =  STDIN.gets.chomp()

	post_image = images[post_image_selection.to_i]

	post = [post_date,post_title,post_tags,post_image,post_filename]

	create_post(post)
end


def create_post(post)
	post_file = File.open(post[4], 'w')
	post_file.write("---\n")
	post_file.write("layout: post\n")
	post_file.write("title: \"#{post[1]}\"\n")
	post_file.write("date: #{post[0]}\n")
	post_file.write("image: #{post[3]}\n")
	post_file.write("tags: #{post[2]}\n")
	post_file.write("---\n\n")
	
	puts "[INFO] Post #{post[4]} created"

	return 

end


gather_header()
