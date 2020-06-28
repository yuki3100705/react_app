import React, { Component } from 'react';
import ReactCalendar from 'react-calendar';
import './Calendar.css';
import { Link } from "react-router-dom";
import IconAdministrator from './AdministratorWhite.png';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      //月のデータ
      month_days: {
        20200607: { is_holiday: true },
        20200614: { is_holiday: true },
        20200621: { is_holiday: true },
        20200628: { is_holiday: true },
        20200617: { text: '二宮 誕生日' },
        20200624: { text: 'きたりえbirthday' }
      }
    };
    this.getTileClass = this.getTileClass.bind(this);
    this.getTileContent = this.getTileContent.bind(this);
  }

  // state の日付と同じ表記に変換
  getFormatDate(date) {
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}${('0' + date.getDate()).slice(-2)}`;
  }

  //日付のクラスを付与 (祝日用)
  getTileClass({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return '';
    }
    const day = this.getFormatDate(date);
    return (this.state.month_days[day] && this.state.month_days[day].is_holiday) ?
      'holiday' : '';
  }

  //日付の内容を出力
  getTileContent({ date, view }) {
    // 月表示のときのみ
    if (view !== 'month') {
      return null;
    }
    const day = this.getFormatDate(date);
    return (
      <p>
        <br />
        {(this.state.month_days[day] && this.state.month_days[day].text) ?
          this.state.month_days[day].text : ' '
        }
      </p>
    );
  }

  render() {
    return (
      <div className="MyContent">
        <Link to="/administrator" className="header-icon"><img src={IconAdministrator} className="header-icon" alt="" /></Link>
        <h1>Symitems Calendar</h1>
        <ReactCalendar
          locale="ja-JP"
          value={this.state.date}
          tileClassName={this.getTileClass}
          tileContent={this.getTileContent}
        />
      </div>
    );
  }
}

export default Calendar;