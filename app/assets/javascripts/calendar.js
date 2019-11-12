function yesyes(room_id, plan_id, day = 0) {$('#calendar').fullCalendar({ //カレンダーの表示

  events: { //日ごとの情報をイベントとして取得

    url: '/events.json',
    type: 'GET',
    data: {
      room_id: room_id,
      plan_id: plan_id,
      day: day,

    },
    success: function(){

    },
    error: function() {
      alert('there was an error while fetching events!');
    },
  },

  eventRender: function (event, element, view) { //取得したイベントの見た目の設定、event,element,view にはそれぞれイベントの情報が入っている

    if (view.title.length == 9) {
      var view_m = Number(view.title.slice(5, 8))
    }
    else{
      var view_m = Number(view.title.slice(5, 7))
    }

    if (Number(event.start._i.slice(5, 7)) !=  view_m) {
       // eventの日付がカレンダーが表示されている月ではなかったらイベントを記載しないように
       return false;
    }

    if (event.title.match(/\d/) != null){//予約可能日は数字を含むよう設定したためtrueが予約可能日
      var day = event.start._i
      var target = $(`[data-date=${day}]`)

      $(target[0]).addClass("can_reserve_day")

      $(".fc-event-container").find("can_reserve")
      if(now_reses.indexOf(day) >= 0){//now_resesには現在の選択日が入っている。
        $(event.currentTarget).addClass("selected_day")
        $(target[0]).addClass("selected_day")
        $(element[0]).addClass("selected_day")

      };
    }
  },

  header: {
    left: 'prev',
    center: 'title',
    right: 'next',
  },


  Boolean, default: true,
  showNonCurrentDates: true,
  fixedWeekCount: false,


  eventClick: function(calEvent, jsEvent, view) {　//イベントクリック時の挙動

    select_day(calEvent, jsEvent, view)

  },

  eventMouseover: function(calEvent, jsEvent, view) { //イベントマウスオーバー時
    over_day(calEvent, jsEvent, view)

  },

  eventMouseout: function(calEvent, jsEvent, view) {
    out_day(calEvent, jsEvent, view)

  },

})}