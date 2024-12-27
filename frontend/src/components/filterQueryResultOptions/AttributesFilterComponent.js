import { Form } from "react-bootstrap";

const AttributesFilterComponent = ({ attrsFilter, setAttrsFromFilter }) => {
  console.log(attrsFilter);
  return (
    <>
      {attrsFilter &&
        attrsFilter.length > 0 &&
        attrsFilter.map((item, idx) => (
          <div key={idx} className="mb-3">
            <Form.Label>
              <b>{item.key}</b>
            </Form.Label>
            {item.value.map((item2, idx2) => (
              <Form.Check key={idx2} type="checkbox" label={item2} onChange={e => {
                 setAttrsFromFilter(items => {
                     console.log(item.key)
                 }) 
              }} />
            ))}
          </div>
        ))}
    </>
  );
};

export default AttributesFilterComponent;

