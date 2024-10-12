const langController= async(req, res) => {
    res.json({
      buy: req.t('buy'), 
      sell:req.t('sell'),
      animals: req.t('animals'),
      crops: req.t('crops'),
      buy_animal: req.t('buy_animal'),
      sell_animal: req.t('sell_animal'),
      buy_crop: req.t('buy_crop'),
      sell_crop: req.t('sell_crop'),
      profile:req.t('profile'),
      price:req.t('price'),
      location:req.t('location'),
      category:req.t('category'),
      breed:req.t('breed'),
      milk_capacity:req.t('milk_capacity'),
      litres:req.t('litres'),
      select_price:req.t('select_price'),
      pregnacy_status:req.t('pregnacy_status'),
      child_status:req.t('child_status'),
      pashu_age:req.t('pashu_age'),
      can_bargain:req.t('can_bargain'),
      lactation_period:req.t('lactation_period'),
      sell_pashu_using_whatsapp:req.t('sell_pashu_using_whatsapp'),
      logout:req.t('logout'),
      my_posts:req.t('my_posts'),
      saved_posts:req.t('saved_posts'),
      enter_mobile_number:req.t('enter_mobile_number'),
      get_otp:req.t('get_otp'),
      verify_otp:req.t('verify_otp'),
      otp_sent_check_phone:req.t('otp_sent_check_phone'),
      cows:req.t('cows'),
      buffalo:req.t('buffalo'),
      goats:req.t('goats'),
      sheeps:req.t('sheeps'),
      hens:req.t('hens'),
    });
  }
  module.exports={langController};