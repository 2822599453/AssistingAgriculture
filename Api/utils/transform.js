const transform = {
  // changeObj: 要修改的列  filterObj: 选择条件
  updateSql: (changeObj, filterObj, judgeStr = 'and') => {
    let changeStr = '';
    let filterStr = '';
    let changeArr = [];
    let filterArr = [];
    for (let c_key in changeObj) {
      changeStr += c_key + ' = ?, ';
      changeArr = [ ...changeArr, changeObj[c_key]];
    }
    for (let f_key in filterObj) {
      filterStr += f_key + ` = ? ${judgeStr} `;
      filterArr = [ ...filterArr, filterObj[f_key]];
    }
    changeStr = changeStr.slice(0, -2);
    filterStr = filterStr.slice(0, -4);
    // console.log('changeStr', changeStr);
    // console.log('changeArr', changeArr);
    // console.log('filterStr', filterStr);
    // console.log('filterArr', filterArr);
    const resultArr = [...changeArr, ...filterArr]
    return { changeStr, filterStr, resultArr };
  }
};

module.exports = transform;
