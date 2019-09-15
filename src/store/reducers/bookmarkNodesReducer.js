import handlerFactory from "./bookmarkNodesActionHandlerFactory";

const initState = {
  "5": {
    id: 5,
    parentId: 2,
    title: "Regular Expressions (RegEx) Tutorial #1 - What is RegEx? - YouTube",
    url:
      "https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD",
    regExp: /youtube\.com/
  },
  "6": {
    id: 6,
    parentId: 2,
    title: "My Folder",
    children: [5]
  },
  "7": {
    id: 7,
    parentId: 2,
    title: "Anas folder",
    children: [5]
  },
  "8": {
    id: 8,
    parentId: 2,
    title: "Banana Fish",
    url:
      "https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD",
    regExp: /youtube\.com/
  }
};

const bookmarkNodesReducer = (state = initState, action) => {
  const handle = handlerFactory.getHandler(action.type);
  return handle(state, action);
};

export default bookmarkNodesReducer;
