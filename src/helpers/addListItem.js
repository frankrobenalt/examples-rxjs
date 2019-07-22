function addListItem(nodeId, value) {
  let listNode = document.getElementById(nodeId);

  if (!listNode) {
    listNode = document.createElement("ul");
    listNode.id = nodeId;

    const listIconListItemNode = document.createElement("li");
    listIconListItemNode.className = "list-header";
    listIconListItemNode.innerText = nodeId;

    listNode.appendChild(listIconListItemNode);

    document.body.appendChild(listNode);
  }

  const listItemNode = document.createElement("li");
  const textNode = document.createTextNode(value);

  listItemNode.appendChild(textNode);
  listNode.appendChild(listItemNode);
}

export default addListItem;
