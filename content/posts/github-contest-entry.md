+++
date = "2010-02-23"
title = "GitHub Contest Entry"
+++

<p class="notice">A repository has been put up on
 {{< ghr user="sjp" repo="contest-entry" text="GitHub" >}} with my solution. The
 repository is unlikely to be in a usable state.</p>

During the middle of 2009, the web-based Git hosting service GitHub
held [a content recommendation
contest](http://contest.github.com/). The idea was to create an
algorithm that would recommend a set of repositories that a user might
be interested in. I attempted this contest although I wasn't exactly
successful, mainly due to time issues and a lack of actual
implementation. I will describe my process to getting where I wanted
to go, along with the challenges faced.

The data that GitHub had supplied for analysis was provided in three
files, `data.txt`, `repos.txt` and `lang.txt`. The `data.txt` file was
simply a key-value store, mapping user IDs to repository
IDs. `repos.txt` listed for each repository ID the following: the
repository name, the creation date and (if applicable) the ID of the
repository that it was forked from. Finally, for each repository ID in
`lang.txt`, the language name and the amount of code in that language
(in lines) were given.

My entry for this contest was written in
[R](https://www.r-project.org/) as I needed to learn it for a paper,
and there's no better way to learn a language than by
practice. Fortunately, because the datasets were small, I would not
run into any issues regarding the exhaustion of memory.

The first line of thought that went into the analysis of the data was
to get it into a form where I could easily grab the information I
wanted without having to parse through the txt files. My solution to
this was to load the data into R, parse it, then run a large amount of
`INSERT` queries into a [SQLite](https://sqlite.org/) database. This
turned out to be reasonably quick to import all of the data, however
the problem came when trying to query the database. The queries that I
wanted to use on my SQLite database were **slow**, despite a few
tricks I had applied to try to speed things up. As a result, I had to
abandon the SQLite approach; this was a blessing in disguise as I
would now be able to actually implement my algorithms in R and not
SQL. In retrospect, trying to implement my recommendation queries in
SQL was a bad idea; it should only have been used for a datastore,
nothing more.

After now having the data easily available to me in nicely formatted
data frames, the hard work was just beginning in choosing how to
analyse this data. For starters my approach was that given a user X,
we can see which repositories they are watching, from there we can see
which users have the most in common with user X. With this list of
users, recommend the 10 most common repositories that user X doesn't
have.

My first attempt at implementing this was quite naive. I attempted to
iterate over the entire set of users, see how many repositories the
current user has in common with each user and assign that value to the
user. Once the entire list of users has been iterated, we now know
which users are most in common with the current user, as a result,
find the repositories that appear most in the top 100 users of this
list. From there, we now have recommendation candidates based upon
user association.

Whilst the algorithm may have been quite simple, it would've taken
close to **3 hours** on the old Athlon XP I had at the time **per
recommendation**. I took a while at trying to optimise this problem
and then, like a lot of tough coding problems, I got an idea that
would massively reduce the time taken per recommendation. Instead of
iterating through the entire list of users and checking for any
relationship, simply find all users that have repositories that the
current user has. This removes all useless users along with reducing
the search space at least 100-fold. This new approach brought down
recommendation times per user **from 3 hours to 30s**.

I then began work on improving my recommendation algorithm to
associate a user's repositories with those they had been forked from,
or repositories that had been forked from it. While this may seem like
it would prove to be a strong association, the indications I was
getting was that there just wasn't that much forking going on. As a
result, the forking association wasn't going to be a big factor in
recommendations.

The next improvement I chose was to recommend repositories that shared
similar programming languages. I went about this by first analysing
the proportion of code that each language made up in terms of lines of
code over a given user's set of repositories. I repeated this for
every user, although this proved to be quite time consuming (about
half an hour over all users) it was going to be quick to make
comparisons afterwards. I can't remember how significant this factor
ended up being but my assumption is that it would be very useful for
predictive purposes.

As I mentioned earlier, I said that I can't remember how significant
language proportion associations were. This is because I didn't end up
submitting recommendations that used that factor. It turns out I was a
little bit absent-minded about the dates (this was during a very busy
semester for me) and all I ended up submitting were recommendations
based on user associations. However, I know that the language
association was quite strong because I could see that many other
people essentially followed the same path as I attempted.

## Lessons learned

R is great for statistical analyses and graphics, unfortunately this
contest didn't lend itself to those strong points. Admittedly, at the
time the R code I was writing wasn't idiomatic, nor was it
particularly efficient. Given my experience with R now after having
undertaken a paper on R and creating the
[GeneralizedHyperbolic]({{< ref "projects/ghyp.md" >}}) package I'm
sure I could speed up the code a fair bit. Despite this, more
conventional languages like C, Python, Java, etc. would be more
appropriate.

While you can write algorithms in SQL, it's simply not designed for
that. It's much quicker to pull data from a database into memory and
operate that in a language more suited to the task.

The technique I used to reduce recommendation times from 3 hours down
to 30 seconds is something I'll never forget. It seems blatantly
obvious now, not so much at the time.

Although I had to use [Git](https://git-scm.com/) to submit my results,
for some reason I felt like I could get away without having to use
source control. This (obviously) turned out to be a pretty big
mistake, as I ended up replicating copies of code at several states
during the process anyway. I guess this was pretty much a filesystem
equivalent of committing but without messages (outside of filenames
anyway...). Only after becoming very familiar with Git later on did I
become aware of the magnitude of my folly.

## Improvements

After the contest was over, many decided to post (as I have done) the
process at which they attacked the problem, perhaps with the
generating code too. This revealed to me not only where I would've
placed had I pieced together my entire algorithm (turns out I would've
placed in the top 40) but what my algorithm was lacking.

It turns out that the winners of the contest blended the results from
other top ranking contestants results. While this does achieve most
accurate results, it is not a particularly useful algorithm by
itself. As a result, GitHub also awarded a prize to [Jeremy
Barnes](http://www.barneso.com/) for his second placed effort, and the
fact that he produced a wonderful `README` that went into great depth
as to how he went about solving the problem. After having a quick look
at his site, it comes as no surprise that he's quite an expert in this
field. If you would like to know more about this, have a read through
{{< ghr user="jeremybarnes" repo="github_contest" text="Jeremy's contest entry repository" >}}.
