const fs = require('fs');

function serialize(arr)
{
	// arr = arr.sort((a, b) => a - b);
	let bitString = arr.map(num => num.toString(2).padStart(10, '0')).join('');

	let byteArray = [];
	for (let i = 0; i < bitString.length; i += 8)
	{
		let byte = bitString.slice(i, i + 8);
		byteArray.push(parseInt(byte, 2));
	}

	let binaryString = String.fromCharCode(...byteArray);
	let base64String = btoa(binaryString);

	return base64String;
}

function deserialize(str)
{
	let binaryString = atob(str);
	let byteArray = Array.from(binaryString).map(char => char.charCodeAt(0));

	let bitString = byteArray.map(byte => byte.toString(2).padStart(8, '0')).join('');

	let arr = [];
	for (let i = 0; i < bitString.length; i += 10)
	{
		let bitSegment = bitString.slice(i, i + 10);
		let num = parseInt(bitSegment, 2);
		arr.push(num);
	}

	// for get correct last num, if using 2 padStart(2,'0'), this code not need , but compression not effect
	if (arr.length > 4 && arr.length % 100 !== 0)
	{
		arr[arr.length - 2] = arr[arr.length - 1] + arr[arr.length - 2];
		arr.splice(arr.length - 1, 1);
	}
	return arr;
}

function generateRandomArray(count)
{
	const arr = [];
	for (let i = 0; i < count; i++)
	{
		arr.push(Math.floor((Math.random() * 301)));
	}
	return arr;
}

function generateArrayByCountDigit(start, stop, step = 1)
{
	return Array.from({ length: (Math.abs(start - stop)) / step + 1 }, (_, k) => start + k * step);
}

function nameMode({ sizeRandomArr,
	only9,
	only10_99,
	only100_300,
	everyBy3_900 })
{
	if (sizeRandomArr)
		console.log('Test: random number size of ', sizeRandomArr);
	else if (only9)
		console.log('Test: from 0 to 10');
	else if (only10_99)
		console.log('Test: from 10 to 100');
	else if (only100_300)
		console.log('Test: from 100 to 300');
	else 
	{
		console.log('Test: every num repeat to 3 times , all = 900');
	}
}
function test({
	sizeRandomArr,
	only9,
	only10_99,
	only100_300,
	everyBy3_900 = true
})
{
	let testArr = [];
	if (sizeRandomArr === 0)
		return testArr;
	if (sizeRandomArr)
		testArr = generateRandomArray(sizeRandomArr);
	else if (only9)
		testArr = generateArrayByCountDigit(0, 9);
	else if (only10_99)
		testArr = generateArrayByCountDigit(10, 99);
	else if (only100_300)
		testArr = generateArrayByCountDigit(100, 300);
	else 
	{
		let count = 0;
		for (let i = 0; i < 300;)
		{
			testArr.push(i);
			count++;
			if (count === 3)
			{
				count = 0;
				i++;
			}

		}
	}

	nameMode({ sizeRandomArr, only9, only10_99, everyBy3_900, only100_300 });
	const serializedStr = serialize(testArr);
	const deserializeArray = deserialize(serializedStr);

	const originalSize = Buffer.byteLength(JSON.stringify(testArr), 'utf8');
	const compressedSize = Buffer.byteLength(serializedStr, 'utf8');
	const compressionRatio = (originalSize - compressedSize) / originalSize * 100;

	console.log(`Original Size: ${originalSize} bytes`);
	console.log(`Compressed Size: ${compressedSize} bytes`);
	console.log(`Compression Ratio: ${compressionRatio.toFixed(2)}%`);
	console.assert(JSON.stringify(testArr) === JSON.stringify(deserializeArray), 'Not correct array');
	console.log('\n');
	// fs.writeFileSync('numbers.txt', testArr.join(',') + ' ||| \n ' + deserializeArray.join(','), 'utf-8');

}
test({ sizeRandomArr: 0 });
test({ sizeRandomArr: 50 });
test({ sizeRandomArr: 100 });
test({ sizeRandomArr: 500 });
test({ sizeRandomArr: 1000 });
test({ only9: true });
test({ only10_99: true });
test({ only100_300: true });
test({ everyBy3_900: true });

