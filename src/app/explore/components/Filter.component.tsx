export default function Filter() {
  return (
    <div className="max-w-[342px] max-h-[1400px] bg-[#1C2A36] p-4 rounded-2xl">
      <h2 className="font-semibold text-[32px] my-6">Filter</h2>
      <div>
        <h3 className="font-semibold text-[24px] mb-4">Price</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="free" name="free" value="paid" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="free" className="text-[20px]">Free</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="paid" name="paid" value="free" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="paid" className="text-[20px]">Paid</label>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="font-semibold text-[24px] mb-4">Date</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="today" name="today" value="today" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="today" className="text-[20px]">Today</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="tomorrow" name="tomorrow" value="tomorrow" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="tomorrow" className="text-[20px]">Tomorrow</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="this_week" name="this_week" value="this_week" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="this_week" className="text-[20px]">This Week</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="this_weekend" name="this_weekend" value="this_weekend" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="this_weekend" className="text-[20px]">This Weekend</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="pick_date" name="pick_date" value="pick_date" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="pick_date" className="text-[20px]">Pick a Date</label>
          </div>
          <button type="button" className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400">More</button>
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="font-semibold text-[24px] mb-4">Category</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="adventure" name="adventure" value="adventure" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="adventure" className="text-[20px]">Adventure Travel</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="art" name="art" value="art" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="art" className="text-[20px]">Art Exhibitions</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="auctions" name="auctions" value="auctions" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="auctions" className="text-[20px]">Auctions & Fundraisers</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="beer" name="beer" value="beer" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="beer" className="text-[20px]">Beer Festivals</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="benefit" name="benefit" value="benefit" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="benefit" className="text-[20px]">Benefit Concerts</label>
          </div>
          <button type="button" className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400">More</button>
        </div>
      </div>

      <hr className="my-6" />

      <div>
        <h3 className="font-semibold text-[24px] mb-4">Format</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="community" name="community" value="community" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="community" className="text-[20px]">Commmunity Engagement</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="concert" name="concert" value="concert" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="concert" className="text-[20px]">Concert & Performances</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="conferences" name="conferences" value="conferences" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="conferences" className="text-[20px]">Conferences</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="experiential" name="experiential" value="experiential" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="experiential" className="text-[20px]">Experential Events</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="festival" name="festival" value="festival" className="appearance-none border border-gray-300 rounded-[4px] w-[24px] h-[27px] checked:bg-[#9EDD45]" />
            <label htmlFor="festival" className="text-[20px]">Festivals & Fairs</label>
          </div>
          <button type="button" className="bg-none text-[#9EDD45] text-[22px] self-start py-1 font-medium hover:bg-green-400">More</button>
        </div>
      </div>
    </div>
  );
}