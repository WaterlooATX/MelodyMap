import React from "react"

export default function ShowModal() {
  return (
    <!-- Trigger the modal with a button -->
    <button
        type="button"
        className="btn btn-info btn-lg"
        data-toggle="modal"
        data-target="#myModal">Open Large Modal</button>

    <!-- Modal -->
    <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Modal Header</h4>
                </div>
                <div className="modal-body">
                    <p>This is a large modal.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
  )
}
