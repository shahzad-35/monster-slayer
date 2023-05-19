const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            attacksCount: 0,
            winner: null,
            specialAttackUsed: false,
            logMessages: []
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = "draw";
            } else if (value <= 0) {
                this.winner = "player";
            }
        },
        specialAttackUsed(value) {
            if (value) {
                this.specialAttackUsed = true
            }
        }
    },
    methods: {
        attackMonster() {
            minDamage = 5;
            maxDamage = 15;
            var attackValue = this.getRandomDamage(maxDamage, minDamage);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.attacksCount++;
            this.checkIsSpecialAttckUsed();
            this.addLogMessage('Player', ' attack', attackValue)
        },
        attackPlayer() {
            minDamage = 8;
            maxDamage = 18;
            var attackValue = this.getRandomDamage(maxDamage, minDamage);
            this.playerHealth -= attackValue;
            this.addLogMessage('Monster', ' attack', attackValue)
        },
        specialAttackMonster() {
            minDamage = 10;
            maxDamage = 25;
            var attackValue = this.getRandomDamage(maxDamage, minDamage);
            this.monsterHealth -= attackValue;
            this.attacksCount++;
            this.addLogMessage('Player', ' special attack', attackValue)
            this.attackPlayer();
            this.specialAttackUsed = true;
        },
        getRandomDamage(max, min) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        healPlayer() {
            this.attacksCount++;
            minHealth = 15;
            maxHealth = 30;
            var healedHealth = this.getRandomDamage(minHealth, maxHealth);
            this.playerHealth += healedHealth;
            this.addLogMessage('Player', 'Heal', healedHealth)
            this.attackPlayer();
        },
        checkIsSpecialAttckUsed() {
            this.specialAttackUsed = this.specialAttackUsed == true ? true : false
        },
        startNewGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.attacksCount = 0;
            this.specialAttackUsed = false;
            this.winner = null;
            this.logMessages = [];
        },
        surrenderGame(){
            this.winner = "monster";
        },
        addLogMessage(who, action, value){
            this.logMessages.unshift({who, action, value});
        }
    },
    computed: {
    playerHealthBar() {
        if (this.playerHealth <= 0) {
            return { width: '0%' };
        }
        return { width: this.playerHealth + '%' };
    },
    monsterHealthBar() {
        if (this.monsterHealth <= 0) {
            return { width: '0%' };
        }
        return { width: this.monsterHealth + '%' };
    },
    canUseSpecialAttack() {
        var flag = false;
        if (this.attacksCount == 0) {
            return true;
        }
        if (this.attacksCount % 3 !== 0) {
            flag = true;
        }
        if (this.attacksCount > 3 && !this.specialAttackUsed) {
            flag = false;
        }
        return flag;
    },
    enableHealButton() {
        return this.playerHealth > 15;
    }
}
});

app.mount('#game');