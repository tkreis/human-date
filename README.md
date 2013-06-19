human-date
==========

###Interpret human like dates and ranges.

###Goal
Allow users to type in phrases like: 

``` 
"in the next two weeks", "tomorrow", "1st of March", "in 2 weeks", "in 100 years", ...
``` 
and translate them into dates or date-ranges (ical- format). 

###Current state

- dumb templates. That create the used regular expressions
- getting dates by the follwing format:

```
"next week", "in 2 weeks", "in two hours", "yesterday", "tomorrow", "12 hours before, 12 hours before yesterday/tomorrow, 12 hours from yesterday/tomorrow"
```

###Build project 
With grunt



