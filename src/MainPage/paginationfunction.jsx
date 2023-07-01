import React  from 'react';

export function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>{"<"}</a>;
    }
    if (type === "next") {
      return <a>{">"}</a>;
    }
    return originalElement;
  }
  
  export function onShowSizeChange(current, pageSize) {
    // console.log(current, pageSize);
  }