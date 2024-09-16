const langController= async(req, res) => {
    res.json({
      buy: req.t('buy'), 
      animals: req.t('animals'),
      crops: req.t('crops'),
      buy_animal: req.t('buy_animal'),
      sell_animal: req.t('sell_animal'),
      buy_crop: req.t('buy_crop'),
      sell_crop: req.t('sell_crop')
    });
  }
  module.exports={langController};