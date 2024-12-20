import styles from "./searchBar.styles.module.scss";
import { Button, Input } from "../formElements/FormElements";

import { useUtils } from "../../context/Utils";
import Form from "../form/Form";

const SearchBar = () => {
  const { state, dispatch } = useUtils();

  const search = () => {};
  const comps = {
    input: {
      type: "text",
      id: "searchText",
      placeholder: "Search...",
      text: "",
      noLabel: true,
    },
    searchBtn: {
      type: "submit",
      id: "searchBtn",
      className: styles.searchBtn,
      onClick: search,
      text: "⌕",
    },
    sortBtn: {
      type: "button",
      id: "sortBtn",
      className: styles.sortBtn,
      onClick: () => dispatch({ type: "toggleSortList" }),
      text: "=",
    },
  };

  const handleRequestData = (URL, result) => {
    const req = {
      type: "GET",
      url: URL + "/todos",
      data: result,
      config: {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      },
    };
    const func = {
      tFunc: (form, data) => {
        console.log(data);
      },
      eFunc: (form) => {},
      fFunc: () => dispatch({ type: "toggleAddTask" }),
    };
    return { req, func };
  };

  const components = {
    inputs: [
      {
        type: "text",
        id: "title",
        placeholder: "To do... ✍🏽",
        text: "Task",
      },
      {
        type: "text",
        id: "description",
        placeholder: "Start doing... 🦶🏽",
        text: "Description",
      },
    ],
    buttons: [
      {
        id: "addTask",
        type: "submit",
        className: "",
        onClick: () => {},
        text: "Add",
      },
      {
        id: "cancelAddTask",
        type: "reset",
        className: "button",
        onClick: () => dispatch({ type: "toggleSortList" }),
        text: "Cancel",
      },
    ],
  };

  return (
    <>
      <div className={styles.searchBar}>
        <Button key={comps.searchBtn.id} button={comps.searchBtn} />
        <Input
          key={comps.input.id}
          input={comps.input}
          defaultValue={comps.input.defaultValue}
        />
        <Button key={comps.sortBtn.id} button={comps.sortBtn} />
      </div>
      {state.toggle.sortList && (
        <Form
          handleRequestData={handleRequestData}
          components={components}
          formType="Sort List"
        />
      )}
    </>
  );
};

export default SearchBar;
