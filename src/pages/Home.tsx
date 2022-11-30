import { useEffect, useRef, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import qs from "qs";

import { Categories } from "../components/Categories";
import { Pagination } from "../components/Pagination";
import { PizzaBlock } from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import { SortPopup, list } from "../components/Sort";
import { fetchPizzas } from "redux/pizza/slice";
import { useAppDispatch, RootState } from "redux/store";
import { setCategoryId, setCurrentPage, setFilters } from "redux/filter/slice";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { items, status } = useSelector((state: RootState) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state: RootState) => state.filter
  );

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    /*fetch(
      `https://6314fc585b85ba9b11dae920.mockapi.io/collections?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    )
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setPizzas(arr);
        setIsLoading(false);
      });*/

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );
    window.scroll(0, 0);
  };

  //якщо не було першого рендеру - то не вшиваємо в адресну строку параметри
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);

  //якщо був перший рендер то перевіряєм url параметри і зберігаємо в редакс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      dispatch(
        setFilters({
          ...params,
          sort: sort ? sort : list[0],
          searchValue,
          categoryId,
          currentPage,
        })
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const filteredPizzas =
    // Статичний фільтр за допомогою JS
    /* pizzas
    .filter((pizza) => {
      if (pizza.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })*/
    items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((items, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onClickCategory={onClickCategory} />
        <SortPopup sort={sort} />
      </div>
      <h2 className="content__title">Всі піцци</h2>

      {status === "error" && (
        <div className="content__error">
          <h3>
            Виникла помилка при завантаженні даних... Спробуйте, будь ласка,
            пізніше.
          </h3>
        </div>
      )}

      <div className="content__items">
        {status === "loading" ? skeletons : filteredPizzas}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
