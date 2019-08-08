import React from 'react';

class Modal extends React.Component {

  handleChange = (e) => {
    this.props.handleEventChange(e.target.name, e.target.value)
  }

  isDisabled = () => {
    return this.props.isPast
  }

  render ()
  {

    const {isPast, modalType, closeModal, addEvent, deleteEvent} = this.props

    return (
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{modalType === 'new' ? "New Event" : "Edit Event"}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="mb-4">
                <label class="block text-left text-gray-700 text-sm font-bold mb-2" for="title">
                  Title
                </label>
                <input
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={this.props.title}
                  onChange={this.handleChange}
                  disabled={this.isDisabled()}
                 />
              </div>
              <div class="mb-4">
                <label class="block text-left  text-gray-700 text-sm font-bold mb-2" for="description">
                  Description
                </label>
                <input
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                  placeholder="description"
                  type="text"
                  value={this.props.description}
                  disabled={this.isDisabled()}
                />
              </div>
              <div class="mb-4">
                <label class="block text-left text-gray-700 text-sm font-bold mb-2" for="time">
                  Time
                </label>
                <input
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="time"
                  name="time"
                  onChange={this.handleChange}
                  placeholder="time"
                  type="time"
                  value={this.props.time}
                  disabled={this.isDisabled()}
                 />
              </div>
              <div class="mb-4">
                <label class="block text-left text-gray-700 text-sm font-bold mb-2" for="summary">
                  Summary
                </label>
                <textarea
                  class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="summary"
                  name="summary"
                  row="3"
                  onChange={this.handleChange}
                  placeholder="Summary"
                  type="text"
                  value={this.props.summary}
                  disabled={this.isDisabled()}
                 />
              </div>
            </div>
            <div class="modal-footer">
              <button type="button"
                className={modalType  === 'new' || isPast ? "btn btn-secondary" : "btn btn-danger"}
                onClick={isPast ? closeModal : deleteEvent}
                >
                {modalType  === 'new' || isPast ? "Close" : "Delete"}
              </button>
              <button type="button" class={isPast ? "btn btn-secondary cursor-not-allowed" : "btn btn-primary" } onClick={addEvent} disabled={isPast}>
                {modalType  === 'new' ? "Add Event" : isPast ? "Event Passed" : "Update Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Modal
