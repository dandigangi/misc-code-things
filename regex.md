# Expressions

**Use Case**: Take NextJS generated blog tag list (`/app/tag-data.json`) and turn into `csv` to import into G-Sheets. Adding a tab with all tags so I can reference it in future writing easily.

**Full Input String**

`"devops":1,"cloud":1,"collaboration":1,"education":1,"podcast":6,"entrepreneurship":1,"relationships":1,"management":2,"leadership":2,"individual-contributor":1,"resume":1,"hiring":3,"interviewing":2,"networking":1,"compensation":1,"negotiation":1,"onboarding":1,"coding":1,"building-teams":1,"code":1,"diversity":1,"inclusion":1`


**Short Test String**

Less matches for min number of match cases. Cases are lowercase as alpha string, alpha with dash, and either of those with no comma after.

`"leadership":2,"individual-contributor":1,"inclusion":1`


**Expression**

`"([a-z-]*)":[0-9](,?)` and substitution for new output string w/ `$1$2`

### Basic Explanation

Match on double quote each side `"({someKeyVal})"`, capture the key matches for any strings w/ lowercase alpha and dashes `[a-z-]` unlimited times `*`. Capture is `$1` as parens for each match which is the key. Don't need additional `*` outside of expression since global flag is on. Note that parens captures are left to right, outward and in w/ inward taking precendence over the right.

Continued matching on string for `:`, `0-9`, and optional comma `,`. The comma as optional is a trick way in valid JSON that there is no comma at the end. Captured as `$2`.

Detailed explanation on [Regex101](https://regex101.com/r/RCkcPI/1)

**Break the Solution**

There is multiple cases that would break this and require updates. Numbers higher than 9, new characters other than dash, or the JSON is properly formatted vs minified introducing various whitespace and line breaks are some examples. But! We will adjust when that happens vs pre-optimizing a problem that isn't there so we can finish this and move on with our lives. Whitespace/breaks in particular can be very troublesome but in a case like that we could take our input string (assuming it's valid) and minify it ourselves. Work smarter, not harder.

**Update**:
In Next they have a nifty JSON output they use for tags and their counts. Ended up changing over to changing the function that creates it to generate a CSV with the expected format that I can import to G-sheets.

```
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  let tagKeys = ''

  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = GithubSlugger.slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
          tagKeys += `${formattedTag},`
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.csv', tagKeys.slice(0, -1))
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}
```
