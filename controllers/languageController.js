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
      sell_on_whatsapp:req.t('sell_on_whatsapp')
    });
  }
  module.exports={langController};