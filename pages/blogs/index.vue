<template>
  <div>
    <div>
      <a-row>
        <a-col :span="8">
          <div class="card">
            <img src="https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg" alt="my image">
            <div class="card-body">
              <h3>Lorem ipsum dolor sit amet consectetur adipisicing.</h3>
              <h5>Monday Jan 20, 2020</h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro illo alias aperiam at dolorum ipsam consequuntur sequi nulla! Velit tempore, nisi consequatur nihil deserunt corporis eius at officia eligendi iusto.
              </p>
            </div>
            <div class="card-footer">
              <a-button type="primary">Read More</a-button>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<style scoped>
.card{
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  background-color: white;
  margin: 20px 0;
}
.card img{
  width: 100%;
}
.card-body{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.card-footer{
  display: flex;
  justify-content: end;
  padding-top: 15px;
}
</style>