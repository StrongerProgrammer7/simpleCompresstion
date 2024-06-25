# RUN

`node compression.js`

## Test

```-
sizeRandomArr - priority 1,
only9 - 2,
only10_99 - 3,
only100_300 - 4,
everyBy3_900  - default
```


## Should be

```Test: random number size of  50
Original Size: 184 bytes
Compressed Size: 84 bytes
Compression Ratio: 54.35%


Test: random number size of  100
Original Size: 366 bytes
Compressed Size: 168 bytes
Compression Ratio: 54.10%


Test: random number size of  500
Original Size: 1803 bytes
Compressed Size: 836 bytes
Compression Ratio: 53.63%


Test: random number size of  1000
Original Size: 3669 bytes
Compressed Size: 1668 bytes
Compression Ratio: 54.54%


Test: from 0 to 10
Original Size: 21 bytes
Compressed Size: 20 bytes
Compression Ratio: 4.76%


Test: from 10 to 100
Original Size: 271 bytes
Compressed Size: 152 bytes
Compression Ratio: 43.91%


Test: from 100 to 300
Original Size: 805 bytes
Compressed Size: 336 bytes
Compression Ratio: 58.26%


Test: every num repeat to 3 times , all = 900
Original Size: 3271 bytes
Compressed Size: 1500 bytes
Compression Ratio: 54.14%
```
