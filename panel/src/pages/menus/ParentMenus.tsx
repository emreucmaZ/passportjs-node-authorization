import DataTable from "react-data-table-component";
import { IParentMenusListProps } from "./interfaces/IParentMenusListProps";

const ParentMenus = ({
  parentMenus,
  menus,
  columns,
}: IParentMenusListProps) => {
  function returnAlt(data: any) {
    return (
      <ParentMenus
      columns={columns}
        menus={menus}
        parentMenus={menus.filter((menu) => menu.parentId == data.data._id)}
      />
    );
  }

  return (
    <div className="bg-red-600">
      <DataTable
        columns={columns}
        data={parentMenus}
        expandableRows
        expandableRowsComponent={(data) => returnAlt(data)}
        customStyles={{
          headRow: {
            style: {
              display: "none",
              color: "#223336",
              backgroundColor: "#e7eef0",
            },
          },
          rows: {
            style: {
              color: "#223336",
              backgroundColor: "#e7eef0",
            },
          },
        }}
      />
    </div>
  );
};

export default ParentMenus;
