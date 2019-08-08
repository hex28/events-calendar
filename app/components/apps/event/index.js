import React, {Component} from 'react';
import * as utils from './utils';
import Modal from './modal';

const date = new Date()
const daysOfMonthByWeek = utils.getDaysInMonth(date.getMonth() + 1, date.getFullYear())

class Event extends Component{

  state = {
    daysOfWeek: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
    weeks: [{}, {}, {}, {}],
    weekIndex: 0,
    selectedDay: null,
    modalType: 'new',
    time: '',
    title: '',
    description: '',
    summary: '',
    isPast: false
  }

  componentWillMount(){
    let month = localStorage.getItem('month');
    if (date.getMonth() + 1 > month) {
      localStorage.setItem('month', date.getMonth() + 1)
      localStorage.removeItem('events')
    }
    let events = localStorage.getItem('events');
    if (events === null) {
      localStorage.setItem('events', JSON.stringify(this.state.weeks))
    } else {
      let parsedEvents =  JSON.parse(events)
      for (var i = 0; i < parsedEvents.length; i++) {
        for (var day in parsedEvents[i]) {
          if (daysOfMonthByWeek[i][day] === undefined) {
            delete parsedEvents[i][day]
          }
        }
      }
      localStorage.setItem('events', JSON.stringify(parsedEvents))
      this.setState({
        weeks: parsedEvents
      })
    }
  }

  componentDidMount(){
  }

  openModal = (type, index, day, isPast) =>{
    if (
      daysOfMonthByWeek[index][day] === undefined
    ) {
      return;
    }
    const { weeks } = this.state
    let title = '';
    let description = '';
    let time = '';
    let summary = '';
    if (type === 'edit' && this.state.weeks[index][day] !== undefined ){
      title = weeks[index][day].title
      description = weeks[index][day].description
      time = weeks[index][day].time
      summary = weeks[index][day].summary
    }
    this.setState({
      modalType: type,
      weekIndex: index,
      selectedDay: day,
      title: title,
      description: description,
      time: time,
      isPast: isPast,
      summary: summary,
    }, ()=>{
      $('#exampleModal').modal('show')
    })
  }

  closeModal = () => {
    $('#exampleModal').modal('hide')
  }

  addEvent = () => {
    let {weeks, weekIndex, selectedDay, title, description, time, summary} = this.state
    weeks[weekIndex] = {
      ...weeks[weekIndex],
      [selectedDay]: {
        title,
        description,
        time,
        summary,
      }
    }
    localStorage.setItem('events', JSON.stringify(weeks))
    this.setState({
      weeks: weeks
    },()=>{
      $('#exampleModal').modal('hide')
    })
  }

  deleteEvent = () => {
    let {weeks, weekIndex, selectedDay} = this.state
    delete weeks[weekIndex][selectedDay]
    localStorage.setItem('events', JSON.stringify(weeks))
    this.setState({
      weeks: weeks
    },()=>{
      $('#exampleModal').modal('hide')
    })
  }

  handleEventChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  render () {

    return (
      <div class="flex-1 pl-16 pr-16">
        <div className="w-full margin-center text-center mb-4">
          <div className="margin-center rounded border overflow-hidden shadow-lg mt-2">
            <table className="w-full">
              <tr>
                {
                  this.state.daysOfWeek.map(day =>
                    <th>{utils.capitalize(day)}</th>
                  )
                }
              </tr>
              {
                this.state.weeks.map((week, index)=>
                  <tr>
                    {
                      this.state.daysOfWeek.map(day =>
                        <td className={
                          daysOfMonthByWeek[index][day] === undefined
                          || daysOfMonthByWeek[index][day] < date.getDate()
                          ? "w-40 h-40 relative calendar-grid-border bg-gray-400"
                          : "w-40 h-40 relative calendar-grid-border cursor-pointer"  }
                          onClick={()=>{
                          this.openModal(
                            week[day] === undefined ? 'new' : 'edit',
                            index,
                            day,
                            daysOfMonthByWeek[index][day] < date.getDate() ? true : false,
                          )
                        }}>
                          <div className="absolute top-0 right-0 p-1">
                            <span className={date.getDate() === daysOfMonthByWeek[index][day] ? "bg-blue-500 rounded-full text-white font-bold px-2" : "px-2" }>
                              {daysOfMonthByWeek[index][day]}
                            </span>
                          </div>
                          {
                            week[day] !== undefined &&
                            <div className="px-2">
                              <div
                                className={
                                  daysOfMonthByWeek[index][day] < date.getDate() ?
                                  "bg-gray-500 hover:bg-gray-700 text-sm text-white font-bold py-1 px-2 rounded-full cursor-pointer"
                                  :
                                  "bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-1 px-2 rounded-full cursor-pointer"
                                }
                                >
                                <div className="hidden md:block ">{utils.truncateString(week[day].title)}</div>
                                <div>{'@ ' + utils.convertTime(week[day].time)}</div>
                              </div>
                            </div>
                          }
                        </td>
                      )
                    }
                  </tr>
                )
              }
            </table>
            {/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
              Launch demo modal
            </button> */}

            <Modal {...this.state}
              closeModal={this.closeModal}
              addEvent={this.addEvent}
              deleteEvent={this.deleteEvent}
              handleEventChange={this.handleEventChange} />
          </div>
        </div>
      </div>
    )
  }

};

export default Event;
