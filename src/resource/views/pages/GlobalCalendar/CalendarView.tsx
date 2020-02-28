import React, { FunctionComponent } from "react";
import Loader from "../../containers/Loader/Loader";
import { Table } from "reactstrap";
import { languageTranslation } from "../../../../helpers";
import { IState, ICalendarViewProps } from "../../../../interfaces";

const CalendarView: FunctionComponent<ICalendarViewProps> = ({
  isLoading,
  states
}): JSX.Element => {
  return (
    <div className="table-minheight ">
      <Table bordered hover responsive>
        <thead className="thead-bg">
          <tr>
            <th className="text-center">
              {languageTranslation("DATE_AND_EVENT")}
            </th>
            {isLoading ? (
              <Loader />
            ) : (
              states.map((state: IState, index: number) => (
                <th className="text-center" key={index}>
                  {state.name}
                </th>
              ))
            )}
          </tr>
        </thead>
      </Table>
    </div>
  );
};

export default CalendarView;
