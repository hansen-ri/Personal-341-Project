module.exports = (mongoose) => {
    const Firearm = mongoose.model(
      'firearms',
      mongoose.Schema(
        {
          brand: String,
          model: String,
          caliber: String,
          msrp: Number,
          color: String,
          type: String,
          use: String
        },
        { timestamps: true }
      )
    );
  
    return Firearm;
  };