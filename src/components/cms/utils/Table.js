class Utils {

	/**
	 * Filter array of object 
	 * list - array of objects that need to filter
	 *  key - object key target
	 * value  - value that excluded from filter
	 *  a value minus b value
	 */
	static filterArray(list, key, value) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] === value)
		}
		return data
	}

	/**
	 * Remove object from array by value
	 * list - array of objects
	 *  key - object key target
	 * value  - target value
	 * Array that removed target object
	 */
	static deleteArrayRow(list, key, value) {
		let data = list
		if(list) {
			data = list.filter(item => item[key] !== value)
		}
		return data
	}

	/**
	 * Wild card search on all property of the object
	 * input - any value to search
	 * list - array for search
	 * array of object contained keyword
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
	 *  screens - Grid.useBreakpoint() from antd
	 * array of breakpoint size
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