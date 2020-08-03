urls = ["https://www.youtube.com/embed/ufhPvXy2AUk",
  "https://www.youtube.com/embed/PI4JABNwB_U",
  "https://www.youtube.com/embed/5qap5aO4i9A",
  "https://www.youtube.com/embed/PwSHOI7DwWM",
  "https://www.youtube.com/embed/O4iGNXsqghs",
  "https://www.youtube.com/embed/sjkrrmBnpGE",
  "https://www.youtube.com/embed/q7JDYiLz9Mo",
  "https://www.youtube.com/embed/BVzVW2hHR20",
  "https://www.youtube.com/embed/VCPJkpgX4oI",
  "https://www.youtube.com/embed/ZBAvAEreZt0",
  "https://www.youtube.com/embed/E0G5Y2SOW0c",
  "https://www.youtube.com/embed/x5-QoCicNfI",
  "https://www.youtube.com/embed/c0_ejQQcrwI",
  "https://www.youtube.com/embed/ibjlUp2klrE",
  "https://www.youtube.com/embed/RO33VkzgDu0",
  "https://www.youtube.com/embed/pn-W0DVQw8Y",
  "https://www.youtube.com/embed/EmwGaqjMJkM",
  "https://www.youtube.com/embed/7XV7whomojk",
  "https://www.youtube.com/embed/v_qHWgmsPrw",
  "https://www.youtube.com/embed/3CJhk9PV48c",
  "https://www.youtube.com/embed/fGMGsWP__Fk",
  "https://www.youtube.com/embed/BOdLmxy06H0",
  "https://www.youtube.com/embed/VH3VFi9C4Z0",
  "https://www.youtube.com/embed/gKPwACJEnAA",
  "https://www.youtube.com/embed/PhYRRpHienM",
  "https://www.youtube.com/embed/pc3M3cH6iJo"
]

9.times do
  user = User.create(
    image: avatar = Faker::Avatar.image(format: "jpg", size: "200x200", set: "set5"),
    email: Faker::Internet.email,
    password: 'password',
    password_confirmation: 'password',
    name: Faker::Name.name,
  )
    3.times do
      user.videos.create(
        title: Faker::Book.title,
        desc: Faker::Food.description, 
        trailer: urls.sample,
        user_id: rand(1..9),
      )
  end
end

200.times do
  x = rand(1..9)
  Comment.create(
    body: Faker::GreekPhilosophers.quote,
    video_id: Video.all.sample.id,
    user_id: x,
    user_name: User.find(x).name,
    user_image: User.find(x).image,
  )
end

puts 'DB seeded'