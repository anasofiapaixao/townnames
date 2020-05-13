# townnames

The British Town Names twitter bot in all its glory

## Credentials
If you are future Sofia wanting to view her own credentials files, install git-crypt and add the key with
`git-crypt unlock /path/to/key`

If you're not future Sofia, here's the format of both:

#### twitterConfig.json
```
{
   "consumer_key": "KEY",
   "consumer_secret": "KEY",
   "access_token": "KEY",
   "access_token_secret": "KEY"
 }
```

#### wordnikConfig.json
```
{
  "apiKey": "KEY"
}

```

twitterConfig is formatted with `snake_case` so the object can be plugged straight in Twit initialization. 

