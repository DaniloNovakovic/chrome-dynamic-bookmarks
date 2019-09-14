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
  }
};

const bookmarkNodesReducer = (state = initState, action) => {
  const handle = handlerFactory.getHandler(action.type);
  return handle(state, action);
};

export default bookmarkNodesReducer;
