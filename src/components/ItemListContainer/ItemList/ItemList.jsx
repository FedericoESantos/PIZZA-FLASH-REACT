import Item from "./Item/Item"

const ItemList = ({ items }) => {

  return (
      <div className="card-detail">
        {
          items.map((item) => (
            <div key={item.id}>
              <Item items = {item} />
            </div>
          )
          )
        }
      </div>
  );
};

export default ItemList;
