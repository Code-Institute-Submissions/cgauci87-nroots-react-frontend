class Utils {
	/**
	 * Returns either ascending or descending value
	 *  a - antd Table sorter param a
	 *  b - antd Table sorter param b
	 *  key - object key for compare
	 *  return  a value minus b value
	 */
	static antdTableSorter(a, b, key) {
		if(typeof a[key] === 'number' && typeof b[key] === 'number') {
			return a[key] - b[key]
		}

		if(typeof a[key] === 'string' && typeof b[key] === 'string') {
			a = a[key].toLowerCase();
			b = b[key].toLowerCase();
			return a > b ? -1 : b > a ? 1 : 0;
		}
		return
	}

	/**
	 * Filter array of object 
	 * list - array of objects that need to filter
	 * key - object key target
	 * any value  - value that excluded from filter
	 * return a value minus b value
	 */
	static filterArray(list, key, value) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] === value)
		}
		return data
	}

	/**
	 * Wild card search on all property of the object
	 * Number | String input - any value to search
	 * Arraylist - array for search
	 * Return array of object contained keyword
	 */
	static wildCardSearch(list, input) {
		const searchText = (item) => {
			for (let key in item) {
				if (item[key] == null) {
					continue;
				}
				if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
					return true;
				}
			}
		};
		list = list.filter(value => searchText(value));
		return list;
	}

	/**
	 * Get Breakpoint
	 * screens - Grid.useBreakpoint() from antd
	 * Return array of breakpoint size
	 */
	static getBreakPoint(screens) {
		let breakpoints = []
		for (const key in screens) {
			if (screens.hasOwnProperty(key)) {
				const element = screens[key];
				if (element) {
					breakpoints.push(key)
				}
			}
		}
		return breakpoints
	}
}

export default Utils;