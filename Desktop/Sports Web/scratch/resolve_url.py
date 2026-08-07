import urllib.request

url = "https://share.google/os4aOE2SQ3ZD2S3gZ"
try:
    # Use urllib which handles redirect and we can read the final URL
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
    )
    with urllib.request.urlopen(req) as response:
        print("Final URL:", response.geturl())
        print("Status code:", response.getcode())
        content = response.read().decode('utf-8', errors='ignore')
        print("Content length:", len(content))
        # print some of it to find redirect scripts if any
        if len(content) > 0:
            print("Content excerpt:", content[:1000])
except Exception as e:
    print("Error:", e)
