---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---
<ul>
    {% for item in site.data.samplelist.docs %}
        <li><a href="{{ item.url }}">{{ item.title }}</a></li>
    {% endfor %}
</ul>
<a href="/assets/img/zack-glick.jpg" alt="Zack Glick photo"><img src="/assets/img/zack-glick.jpg" alt="Zack Glick photo" style="float:left; width:20%; padding: 10px"></a>

Born in San Francisco, grown in Buffalo, educated in Syracuse, and living back in Buffalo after trips thru Rhode Island, North Virginia, and Washington state. Work experince includes for [AWS Security](https://aws.amazon.com), [Dell Secureworks](http://www.secureworks.com/), and the [Syracuse City School District](http://www.syracusecityschools.com/). 

Zack works in cloud security on the defensive side with experince in coordinated vulnerability disclosure, incident response, and threat modeling.