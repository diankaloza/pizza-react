import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

import debounce from "lodash.debounce";

import styles from "./Search.module.scss";

import { useDispatch } from "react-redux";
import { setSearchValue } from "redux/filter/slice";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    dispatch(setSearchValue(value));
    setValue("");
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <AiOutlineSearch className={styles.searchIcon} />
      <input
        ref={inputRef}
        value={value}
        className={styles.input}
        onChange={onChangeInput}
        placeholder="Пошук піци..."
      />
      {value && (
        <AiOutlineClose onClick={clearInput} className={styles.clearIcon} />
      )}
    </div>
  );
};
