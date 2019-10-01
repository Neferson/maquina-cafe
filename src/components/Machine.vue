<template>
  <div class="maquina">
    <div id="main-content">

      <div class="container">
			<div class="row coin-line">

               <div class="col col-md-2">
                    <p>
                      <img class="size_40" src="https://img.icons8.com/carbon-copy/100/000000/wallet.png" />
                      <span class="wallet-total text-success">R$ {{ wallet | valueToBrl }}</span>
                    </p>
               </div>

                <div class="col-md-8">

                    <ul class="lista-moedas">

                      <li @click="addCents(0.01)">
                        <img src="images/1-centavo.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar 1 Centavo" />
                      </li>

                      <li @click="addCents(0.05)">
                        <img src="images/5-centavo.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar 5 Centavos" />
                      </li>

                      <li @click="addCents(0.10)">
                        <img src="images/10-centavo.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar 10 Centavos" />
                      </li>

                      <li @click="addCents(0.25)">
                        <img src="images/25-centavo.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar 25 Centavos" />
                      </li>

                      <li @click="addCents(0.50)">
                        <img src="images/50-centavo.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar 50 Centavos" />
                      </li>

                      <li @click="addCents(1.00)">
                        <img src="images/1-real.png" data-toggle="tooltip" data-placement="bottom" title="Clique para adicionar R$ 1 Real" />
                      </li>

                    </ul>

                    <small>* Clique nas moedas para adicionar dinheiro em sua carteira virtual</small>
              </div>
            </div>

            <div class="row title-line">
                <div class="col col-md-10 offset-2">
                    <h1 class="text-right">A hora mais feliz do dia. <br> É a hora do café!</h1>
                </div>
            </div>

          <div class="row">
               <br><br><br><br>
				<div class="col col-md-3 col-sm-6 col-xs-6"  v-for="(product, index) in products">
					<div class="item-product">
						<img class="cafe-image img-fluid mx-auto d-block"  :src="product.image" />
						<div class="item-container">
							<h4 class="text-center ">{{ product.name }} </h4>

                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <b><span class="pull-left">Preço</span> <span class="pull-right">R$  {{ product.price | valueToBrl }}</span></b>
                                </li>
                                <li class="list-group-item">
                                    <b><span class="pull-left">Tamanho</span> <span class="pull-right">300Ml</span></b>
                                </li>
                            </ul>
                            <br>
							<div class="item-button text-center">
								<button type="button" class="btn btn-outline-light" v-on:click="checkout( product.price, index )"  v-if="product.disabled">
									<i class="fa fa-lock"></i>
									Compra bloqueada!
								</button>

								<button type="button" class="btn btn-outline-light" v-on:click="checkout( product.price, index )" v-if="!product.disabled">
                                    <i class="fa fa-unlock"></i>
									Quero este!
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>

        </div>
    </div>

      </div>
    </div>
</template>

<script>
export default {
  name: "maquina",
  data() {
    return {
      products: [
        { name: "Café", price: 2.0, disabled: true, image: 'images/copo-cafe.png' },
        { name: "Cappuccino", price: 3.5, disabled: true, image: 'images/copo-cappuccino.png' },
        { name: "Mocha", price: 4.0, disabled: true, image: 'images/copo-mocha.png' },
        { name: "Café com Leite", price: 3.0, disabled: true, image: 'images/copo-cafe.png' }
      ],
      wallet: 0.0,
      cart: 0.0,
      withdrawal: 0.0
    };
  },

  computed: {
  },

  methods: {
    addCents(value) {

      if (value > 0.05 ) {
		
		this.wallet += value;
		
		// realiza o desbloqueio do produto para venda
		for(let i = 0; i < this.products.length; i++){

			if(this.products[i].price <= this.wallet ) {
				this.products[i].disabled = false;
			} else {
				this.products[i].disabled = true;
			}
		};

      } else {

        this.$swal({
          type: "error",
          title: "Aconteceu um erro!",
          text: "Essa maquina não aceita moedas de 1 ou 5 Centavos!"
        });

      }

	},
	lockBuy(){
		for(let i = 0; i < this.products.length; i++){
			this.products[i].disabled = true;
		};
	},
    checkout( cart, index ) {
	  
	  // recebe o estado da carteira, para não alterar os valores em data()
	  let wallet = this.wallet;

	  let products = this.products;

    	if ( wallet >= cart && wallet > 0) {
			
			let message = 'Você não possui troco.'

			if( this.wallet - cart ) {
				 message = "Seu troco é: R$ " +  this.$options.filters.valueToBrl(this.wallet - cart)
			}

			this.$swal({
          		type: "success",
          		title: "Obrigado pela preferência!",
          		html: "Seu <b>" + products[index].name + "</b> já está sendo preparado. <br>" + message
			});

			this.wallet = 0.00;

			this.cart = 0.0;

			this.lockBuy()
		
      	} else {

        	this.$swal({
          		type: "error",
          		title: "Erro!",
          		text: "Você não possui crédito suficiente para comprar este produto. Adicione cédito clicando nas moedas acima!"
			});		
      	}
	}
  },
  filters: {
    valueToBrl: function(value) {
      return value.toFixed(2).replace(".", ",");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #main-content{
        padding: 15px;
        /*background-image: url('../../public/images/back-main-container.jpg');*/
    }

    .coin-line, .title-line{
        margin-bottom: 100px;
    }

    h1{
        font-size: 4.050em;
        font-weight: bold;
        color: #016945;
    }

    .product-item {
      margin-right: 15px;
    }

    ul.lista-moedas {
      padding: 0;
      margin: 0;
    }

    ul.lista-moedas li {
      display: inline-block;
      list-style: none;
      margin-right: 5px;
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.5s;
    }

    .lista-moedas li:hover {
      display: inline-block;
      list-style: none;
      margin-right: 5px;
      opacity: 0.9;
    }

    .lista-moedas li img {
      width: 60px;
    }

    .size_20 {
      width: 20px;
    }

    .size_30 {
      width: 30px;
    }

    .size_40 {
      width: 40px;
    }

    .size_50 {
      width: 50px;
    }

    .wallet-total {
      font-size: 1.2em;
    }

    .card img {
        opacity: 0.6;
        transition: all 0.5s;
    }

    .card:hover img {
        opacity: 1;
    }
    .card:hover, .card:hover ul li{
        background: #f8f8f8;
        transition: all 0.5s;
    }


    .cafe-image{
        margin-top: -50px;
        position: relative;
        z-index: 5;
        max-width: 60% !important;
        transition: all 0.5s;
    }

    .item-product:hover .cafe-image {
        max-width: 68% !important;
    }

    .item-container {
        background: #eee;
        border-radius: 15px;
        padding: 180px 15px 15px 15px;
        position: relative;
        margin-top: -160px;
        transition: all 0.5s;
        margin-bottom: 120px;

    }
    .item-container ul li {
        background: transparent;
    }
    .item-product:hover .item-container {
        background: url('../../public/images/back-mask.png') no-repeat  #016945;
        color: #fff;
        margin-top: -180px;

    }
    .item-container h4{
        font-size: 20px;
        text-transform: uppercase;
        font-weight: bold;
    }

    .item-button .btn-outline-light{
        border-radius: 25px;
        color: #016945;
        transition: all 0.5s;
        border-color: #016945;
    }

    .item-product:hover .btn-outline-light{
        border-color: #fff;
        color: #fff;
    }

    .item-product:hover .btn-outline-light:hover{
        color: #016945;
    }

</style>
