export default function getBreadcrumbIds(nodes = {}, id = "0") {
  let breadcrumbs = [];
  let currId = id;
  while (currId) {
    breadcrumbs.push(currId);
    const currNode = nodes[currId] || {};
    currId = currNode.parentId;
  }
  return breadcrumbs.reverse();
}
